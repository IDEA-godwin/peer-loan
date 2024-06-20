
import {SigningArchwayClient} from "@archwayhq/arch3.js";

// const GROUP_CONTRACT = import.meta.env.VITE_GROUP_CONTRACT_ADDRESS;
const MULTISIG_CONTRACT = import.meta.env.VITE_MULTISIG_CONTRACT_ADDRESS;

export const proposeLoanDisbursement = async (client: SigningArchwayClient, signerAddress: string, msg: object) => {
    const txResult = await client.execute(signerAddress, MULTISIG_CONTRACT, msg, 'auto', "perform increment");
    console.log('Tx Result', txResult);
}

export const queryLoanOffers = async (client: SigningArchwayClient, entrypoint: object) => {

    const queryResult = await client.queryContractSmart(MULTISIG_CONTRACT, entrypoint);
    console.log(queryResult)
}