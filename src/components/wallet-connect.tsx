import {useEffect, useState} from "react";
import {TestnetChainInfo as chainInfo} from "../configs/ChainInfo.ts";
import {Key} from "@keplr-wallet/types";


export default function WalletConnect() {

  const [key, setKey] = useState<Key>()
  const [walletConnected, setWalletConnected] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('wallet_connected')) connectWallet();
  }, []);

  const connectWallet = async () => {
    if (!window.getOfflineSigner || !window.keplr) {
      alert("Please install keplr extension")
    } else {
      if (window.keplr.experimentalSuggestChain) {
        try {
          await window.keplr.experimentalSuggestChain(chainInfo)
          window.keplr.defaultOptions = {
            sign: {
              preferNoSetFee: true,
            }
          }
          const chainId = chainInfo.chainId;
          await window.keplr.enable(chainId);
          window.keplr?.getKey(chainInfo.chainId).then((key: Key) => {
            setKey(key);
            setWalletConnected(true)
            localStorage.setItem('wallet_connected', 'true');
          })
        } catch {
          alert("Failed to suggest the chain")
        }
      } else {
        alert("Please use the recent version of keplr extension")
      }
    }
  }

  const disconnectWallet = async () => {
    window.keplr?.disable().then(() => {
      setWalletConnected(false);
      localStorage.setItem('wallet_connected', '')
    })
  }

  const truncWalletAddr = (addr?: string) => {
    if (!addr) return;
    const truncateRegex = /^(archway[a-zA-Z0-9]{5})[a-zA-Z0-9]+([a-zA-Z0-9]{5})$/;
    const match = addr.match(truncateRegex);

    if (!match) return addr;

    return `${match[1]}…${match[2]}`;
  }

  return (
    <div className="d-none d-lg-flex py-3">
      <div
        className="hstack flex-fill justify-content-end flex-nowrap gap-6 ms-auto  px-xxl-8"
      >
        <div className="dropdown d-none">
          <a
            href="#"
            className="nav-link"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ><i className="bi bi-sun-fill"></i></a>
          <div className="dropdown-menu">
            <button
              type="button"
              className="dropdown-item d-flex align-items-center"
              data-bs-theme-value="light"
            >
              Light
            </button>
            <button
              type="button"
              className="dropdown-item d-flex align-items-center"
              data-bs-theme-value="dark"
            >
              Dark
            </button>
            <button
              type="button"
              className="dropdown-item d-flex align-items-center"
              data-bs-theme-value="auto"
            >
              System
            </button>
          </div>
        </div>
        {
          !walletConnected &&
          <>
            <button
              type="button" onClick={connectWallet}
              className="btn btn-sm btn-primary rounded-pill text-nowrap"
            >
              Connect
            </button>
          </>
        }
        {
          walletConnected &&
          <>
            <div className="flex text-start">
              <h4 className="fs-6">{key?.name}</h4>
              <p className="short-addr">{truncWalletAddr(key?.bech32Address)}</p>
            </div>
            <div>
              <a role="button" onClick={disconnectWallet}>
                <i className="bi bi-box-arrow-right fs-5 text-danger"></i>
              </a>
            </div>
          </>
        }
      </div>
    </div>
  )

}
