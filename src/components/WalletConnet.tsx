
import { useEffect, useState } from "react";
import { connectKeplrWallet } from "../configs/keplr-config.ts";
import { TestnetChainInfo as chainInfo } from "../configs/ChainInfo.ts";
import { Key } from "@keplr-wallet/types";


export default function WalletConnect({walletConnected, setWalletConnected}: any) {

  const [key, setKey] = useState<Key>()

  useEffect(() => {
    window.keplr?.getKey(chainInfo.chainId).then((key: Key) => {
      setWalletConnected(true)
      setKey(key)
    })
  })

  const connectWallet = async () => {
    const signer = await connectKeplrWallet();
    if (signer) setWalletConnected(true)
  }

  const disconnectWallet = async () => {
    window.keplr?.disable().then(() => {
      setWalletConnected(false)
    })
  }

  return (
    <div>
      { !walletConnected && <button onClick={connectWallet}>Connect Wallet</button> }
      { walletConnected &&
        <div>
          <h3>{key?.name}</h3>
          <p>{key?.bech32Address}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div> }
    </div>
  )

}
