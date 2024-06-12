
import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { TestnetChainInfo as chainInfo } from './ChainInfo';

export const connectKeplrWallet = async () => {  
    const keplr = window.keplr
    if (keplr && window.getOfflineSignerAuto) {   
        if (keplr['experimentalSuggestChain']) {    
            await keplr.experimentalSuggestChain(chainInfo)
            await keplr.enable(chainInfo.chainId)      
            keplr.defaultOptions = {        
                sign: {          
                    preferNoSetFee: false,
                }     
            }
            const offlineSigner = await window.getOfflineSignerAuto(chainInfo.chainId);
            const accounts = await offlineSigner.getAccounts();
            console.log(accounts);
            return offlineSigner
        } else {      
            console.warn('Error accessing experimental features, please update Keplr')  
        }  
    } else {    
        console.warn('Error accessing Keplr, please install Keplr')
    }
}

export const cosmClient = async (signer?: any) => {
    return SigningArchwayClient.connectWithSigner(chainInfo.rpc, signer)
}