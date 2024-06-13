
import './App.css'

import { useEffect, useState } from 'react'
import WalletConnect from "./components/WalletConnet.tsx";
import { TestnetChainInfo as chainInfo } from "./configs/ChainInfo.ts";
import { cosmClient } from "./configs/keplr-config.ts";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { toUtf8 } from "@cosmjs/encoding";

function App() {
  const [count, setCount] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false)
  const [signer, setSigner] = useState<any>()

  useEffect(() => {
    if (window.getOfflineSignerAuto) {
      const offlineSigner = window.getOfflineSignerAuto(chainInfo.chainId)
      setSigner(offlineSigner)
    }
  }, [window.getOfflineSignerAuto]);

  useEffect(() => {
    if (signer)
      getCount()
  }, [signer]);



  const getCount = async () => {
    if (signer) {
      const client = await cosmClient(await signer);
      // Query arguments
      const contractAddr = import.meta.env.VITE_CONTRACT_ADDRESS
      const entrypoint = {
        get_count: {}
      };
      // Do query type 'smart'
      const queryResult = await client.queryContractSmart(contractAddr, entrypoint);
      setCount(queryResult['count'])
    }
  }

  const increaseCount = async () => {
    if (signer) {
      const offlineSigner = await signer;
      const client = await cosmClient(offlineSigner);
      const accounts = await offlineSigner.getAccounts();
      // Query arguments
      const contractAddr = import.meta.env.VITE_CONTRACT_ADDRESS;
      const msg = {
        increment: {}
      };
      const executeMsg = {
        typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
        value: MsgExecuteContract.fromPartial({
          sender: accounts[0].address,
          contract: contractAddr,
          msg: toUtf8(JSON.stringify(msg)),
          funds: [],
        }),
      };
      client.execute()
      const fee = await client.calculateFee(accounts[0].address, [executeMsg], undefined, 4);
      const txResult = await client.signAndBroadcast(accounts[0].address, [executeMsg], 'auto');
      console.log('Tx Result', txResult);
      if (txResult.code !== undefined && txResult.code !== 0) {
        alert("Failed to send tx: " + txResult.rawLog);
      } else {
        alert("Succeed to send tx:" + txResult.transactionHash);
      }
    }
  }

  return (
    <>
      <WalletConnect walletConnected={walletConnected} setWalletConnected={setWalletConnected} />
      { walletConnected &&
        <div className="card">
          <p>count is { count }</p>
          <button onClick={increaseCount}>
            Increment
          </button>
       </div>
      }
    </>
  )
}

export default App
