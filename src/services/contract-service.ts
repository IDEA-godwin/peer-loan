
import {SigningArchwayClient} from "@archwayhq/arch3.js";

// const GROUP_CONTRACT = import.meta.env.VITE_GROUP_CONTRACT_ADDRESS;
const MULTISIG_CONTRACT = import.meta.env.VITE_MULTISIG_CONTRACT_ADDRESS;

export const proposeLoanDisbursement = async (client: SigningArchwayClient, signerAddress: string, msg: any) => {
    console.log(msg)
    const coin = {
        amount: msg.propose_loan_offer.loan_deposit.amount,
        denom: msg.propose_loan_offer.loan_deposit.denom,
    }
    const txResult = await client.execute(
        signerAddress, MULTISIG_CONTRACT,
        msg, 'auto', "",
        [coin]
        )
    console.log('Tx Result', txResult)
}

export const queryLoanOffers = async (client: SigningArchwayClient, entrypoint: object): Promise<Array<any>> => {
    const queryResult = await client.queryContractSmart(MULTISIG_CONTRACT, entrypoint)
    return queryResult['loans']
}