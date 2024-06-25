
import {SigningArchwayClient} from "@archwayhq/arch3.js";
import {toUtf8} from "@cosmjs/encoding";
import {MsgExecuteContract} from "cosmjs-types/cosmwasm/wasm/v1/tx";

// const GROUP_CONTRACT = import.meta.env.VITE_GROUP_CONTRACT_ADDRESS;
const MULTISIG_CONTRACT = import.meta.env.VITE_MULTISIG_CONTRACT_ADDRESS;

export const proposeLoanDisbursement = async (client: SigningArchwayClient, signerAddress: string, msg: any) => {
    console.log(msg)
    const coin = {
        amount: msg.propose_loan_offer.loan_deposit.amount,
        denom: msg.propose_loan_offer.loan_deposit.denom,
    }

    const messages = [{
        typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
        value: MsgExecuteContract.fromPartial({
            sender: signerAddress,
            contract: MULTISIG_CONTRACT,
            msg: toUtf8(JSON.stringify(msg)),
            funds: [coin],
        }),
    }]
    const fee = await client.calculateFee(signerAddress, messages)
    const txResult = await client.signAndBroadcastSync(signerAddress, messages, fee)
    console.log('Tx Result', txResult)
}

export const queryLoanOffers = async (client: SigningArchwayClient, entrypoint: object): Promise<Array<any>> => {
    const queryResult = await client.queryContractSmart(MULTISIG_CONTRACT, entrypoint)
    return queryResult['loans']
}