
import {useEffect, useState} from "react";
import {SigningArchwayClient} from "@archwayhq/arch3.js";
import {proposeLoanDisbursement, queryLoanOffers} from "../services/contract-service.ts";
import { TestnetChainInfo as chainInfo} from "../configs/ChainInfo.ts";
import {SubmitHandler, useForm} from "react-hook-form";

interface IFormInput {
  title: string;
  description: string;
  loan_offer: LoanOffer;
  amount: string;
  denom: string
}

enum LoanOffer {
  LOAN_REQUEST = "loan_request",
  LOAN_DISBURSEMENT = "loan_disbursement_request",
}


export default function LoansPage() {
  const [client, setClient] = useState<SigningArchwayClient>()
  const [signerAddress, setSignerAddress] = useState<string>('')

  const [loans, setLoans] = useState<Array<any>>([])

  const {
    register,
    handleSubmit,
    formState: { errors} } = useForm<IFormInput>()

  useEffect(() => {
    async function buildClient() {
      if (localStorage.getItem("wallet_connected") && window.getOfflineSigner) {
        const offlineSigner = await window.getOfflineSigner(chainInfo.chainId)
        const client = await SigningArchwayClient.connectWithSigner(chainInfo.rpc, offlineSigner)
        const accounts = await offlineSigner.getAccounts()
        setSignerAddress(accounts[0].address);
        setClient(client)
      }
    }
    buildClient();
  }, []);

  useEffect(() => {
    if (client) {
      getBalance();
      listLoans();
    }
  }, [client]);

  const getBalance = async () => {
    if (!client) {
      alert("connect wallet.");
      return;
    }
    await client.getBalance(signerAddress, "aconst")
  }

  const listLoans = async () => {
    if (!client) {
      alert("connect wallet");
      return;
    }
    const entrypoint = {
      list_loans: {
        limit: 10,
        start_after: 0
      }
    }
    const loans = await queryLoanOffers(client, entrypoint)
    console.log(loans)
    setLoans(loans)
  }

  const proposeLoan: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
    if (!client) return;
    const propose_loan_offer = {
      loan_offer: data.loan_offer,
      title: data.title,
      description: data.description,
      loan_deposit: {
        amount: data.amount,
        denom: {native: data.denom},
        refund_failed_proposals: true
      }
    }
    proposeLoanDisbursement(client, signerAddress, {propose_loan_offer});
  }


  return (
    <main className="container-fluid px-3 py-5 p-lg-6 p-xxl-8">
      <div className="mb-4 mb-xl-7">
        <div className="row g-3 align-items-center">
          <div className="col">
            <h1 className="ls-tight text-start">Loans</h1>
          </div>
          <div className="col">
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-sm btn-square btn-neutral rounded-circle d-xxl-none"
                data-bs-toggle="offcanvas"
                data-bs-target="#responsiveOffcanvas"
                aria-controls="responsiveOffcanvas"
              >
                <i className="bi bi-three-dots"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade" id="proposalModal" aria-hidden="true"
        tabIndex={-1} aria-labelledby="cryptoModalLabel"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content overflow-hidden">
            <div className="modal-header pb-0 border-0">
              <h1 className="modal-title h4" id="cryptoModalLabel">
                Create Loan Proposal
              </h1>
              <button
                type="button" className="btn-close"
                data-bs-dismiss="modal" aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(proposeLoan)} className="modal-body p-0">
              <div className="p-2">
                <div className="vstack text-start px-5">
                  <div className="mb-3">
                    <label>Loan Title</label>
                    <input className="form-control" {...register("title", {required: true})} />
                    {errors.title && <span className="text-danger">field is required</span>}
                  </div>
                  <div className="mb-3">
                    <label>Loan Description</label>
                    <input className="form-control mb-3" {...register("description", {required: true})} />
                    {errors.description && <span className="text-danger">field is required</span>}
                  </div>
                  <div className="mb-3">
                    <label>Proposal Type</label>
                    <select className="form-select mb-3" {...register("loan_offer", {required: true})}>
                      <option selected defaultValue="Select Proposal Type" disabled={true}>
                        Select Proposal Type
                      </option>
                      <option value="loan_disbursment_request">Loan Disbursal</option>
                      <option value="loan_request">Loan Request</option>
                    </select>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col">
                        <input className="form-control" placeholder="Amount" {...register("amount")} />
                      </div>
                      <div className="col">
                        <input className="form-control" placeholder="Denom" {...register("denom")} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-5 bg-body-secondary d-flex justify-content-center">
                <button type="submit" className="btn btn-sm btn-dark">
                  <i className="bi bi-gear me-2"></i> Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row g-3 g-xxl-6">
        <div className="col-xxl-8">
          <div className="vstack gap-3 gap-md-6">
            <div className="card p-2 rounded-0">
              <div className="card-body p-0">
                <div className="d-flex justify-content-start align-items-center">
                  <a className="py-1 px-3 border nav-link me-2 text-primary-hover" role="button">
                    All
                  </a>
                  <a className="py-1 px-3 border nav-link me-2 text-primary-hover" role="button">
                    Disbursement Proposals
                  </a>
                  <a className="py-1 px-3 border nav-link me-2 text-primary-hover" role="button">
                    Request Proposals
                  </a>
                  <a
                    role="button" className="py-1 px-3 border ms-auto nav-link text-primary-hover"
                    data-bs-toggle="modal" data-bs-target="#proposalModal"
                  >
                    <i className="bi bi-plus-lg"></i> Propose Loan
                  </a>
                </div>
              </div>
            </div>
            <div className="row g-3">
              {
                loans && loans.length > 0 && loans.map(loan =>
                    <div key={loan.id} className="col-sm-6 col-md-4">
                      <div role="button" className="card p-0 shadow-4-hover">
                        <div className="card-body p-3">
                          <div className="d-flex justify-content-end align-items-center gap-1">
                            <span
                              className={`border rounded-pill px-2 py-1 text-capitalize text-xs 
                              ${loan.status == 'open' ? 'bg-secondary-subtle' 
                                : loan.status == 'active' ? 'bg-success-subtle' : 'bg-danger-subtle'}`}
                            >
                              {loan.status}
                            </span>
                            <span className="border rounded-pill px-2 py-1 text-capitalize text-xs bg-primary-subtle">
                              {loan.loaner ? "funding" : "request"}
                            </span>
                          </div>
                          <div className="text-sm fw-semibold mt-3">
                            { loan.title }
                          </div>
                          <div
                            className="d-flex align-items-center gap-2 mt-5 text-sm"
                          >
                            { loan.loaner ? "Amount to disburse: " : "Collateral: "}<span>{ loan.amount_to_disburse || "$1000" }</span>
                          </div>
                        </div>
                      </div>
                    </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="col-xxl-4 d-none">
          <div
            className="offcanvas-xxl m-xxl-0 rounded-sm-4 rounded-xxl-0 offcanvas-end overflow-hidden m-sm-4"
            tabIndex={-1}
            id="responsiveOffcanvas"
            aria-labelledby="responsiveOffcanvasLabel"
          >
            <div className="offcanvas-header rounded-top-4 bg-light">
              <h5 className="offcanvas-title" id="responsiveOffcanvasLabel">
                Quick Stats
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                data-bs-target="#responsiveOffcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="offcanvas-body d-flex flex-column p-3 p-sm-6 p-xxl-0 gap-3 gap-xxl-6"
            >
              <div className="vstack gap-6 gap-xxl-6">
                <div className="card border-0 border-xxl">
                  <div className="card-body d-flex flex-column p-0 p-xxl-6">
                    <div
                      className="d-flex justify-content-between align-items-center mb-3"
                    >
                      <div><h5>Balance</h5></div>
                      <div>
                              <span className="text-heading fw-bold"
                              ><i className="bi bi-arrow-up me-2"></i>7.8%</span
                              >
                      </div>
                    </div>
                    <div className="text-2xl fw-bolder text-heading ls-tight">
                      23.863,21 USDT
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-between mt-8"
                    >
                      <div className="">
                        <div className="d-flex gap-3 align-items-center">
                          <div
                            className="icon icon-sm icon-shape text-sm rounded-circle bg-dark text-success"
                          >
                            <i className="bi bi-arrow-down"></i>
                          </div>
                          <span className="h6 fw-semibold text-muted"
                          >Income</span
                          >
                        </div>
                        <div className="fw-bold text-heading mt-3">
                          $23.863,21 USD
                        </div>
                      </div>
                      <span className="vr bg-dark bg-opacity-10"></span>
                      <div className="">
                        <div className="d-flex gap-3 align-items-center">
                          <div
                            className="icon icon-sm icon-shape text-sm rounded-circle bg-dark text-danger"
                          >
                            <i className="bi bi-arrow-up"></i>
                          </div>
                          <span className="h6 fw-semibold text-muted"
                          >Expenses</span
                          >
                        </div>
                        <div className="fw-bold text-heading mt-3">
                          $5.678,45 USD
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-0 d-xxl-none"/>
                <div className="card border-0 border-xxl">
                  <div className="card-body p-0 p-xxl-6">
                    <div
                      className="d-flex justify-content-between align-items-center mb-5"
                    >
                      <div><h5>Staking rewards</h5></div>
                      <div className="hstack align-items-center">
                        <a href="#" className="text-muted"
                        ><i className="bi bi-arrow-repeat"></i
                        ></a>
                      </div>
                    </div>
                    <div className="vstack gap-1">
                      <div
                        className="d-flex bg-body-secondary gap-3 rounded-3 p-4"
                      >
                        <div className="w-rem-8 h-rem-8 flex-none">
                          <img
                            src="https://satoshi.webpixels.io/img/crypto/icon/ada.svg"
                            alt="..."
                          />
                        </div>
                        <div className="vstack gap-2">
                          <div className="d-flex mb-1">
                            <div className="">
                                    <span
                                      className="d-block text-heading text-sm fw-semibold"
                                    >Staked ADA</span
                                    >
                              <span className="d-block text-muted text-xs"
                              >25% APR</span
                              >
                            </div>
                            <div
                              className="ms-auto d-block text-heading text-sm fw-semibold"
                            >
                              1030 ADA
                            </div>
                          </div>
                          <div className="progress bg-body-tertiary">

                          </div>
                        </div>
                      </div>
                      <div
                        className="d-flex bg-body-secondary gap-3 rounded-3 p-4"
                      >
                        <div className="w-rem-8 h-rem-8 flex-none">
                          <img
                            src="https://satoshi.webpixels.io/img/crypto/icon/eth.svg"
                            alt="..."
                          />
                        </div>
                        <div className="flex-fill vstack gap-2">
                          <div className="d-flex mb-1">
                            <div className="">
                                    <span
                                      className="d-block text-heading text-sm fw-semibold"
                                    >Staked ETH</span
                                    >
                              <span className="d-block text-muted text-xs"
                              >16% APR</span
                              >
                            </div>
                            <div
                              className="ms-auto fw-bold text-heading text-sm"
                            >
                              9.5 ETH
                            </div>
                          </div>
                          <div className="progress bg-body-tertiary">

                          </div>
                        </div>
                      </div>
                      <div
                        className="d-flex bg-body-secondary gap-3 rounded-3 p-4"
                      >
                        <div className="w-rem-8 h-rem-8 flex-none">
                          <img
                            src="https://satoshi.webpixels.io/img/crypto/icon/xrp.svg"
                            alt="..."
                          />
                        </div>
                        <div className="vstack gap-2">
                          <div className="d-flex mb-1">
                            <div className="">
                                    <span
                                      className="d-block text-heading text-sm fw-semibold"
                                    >Staked XRP</span
                                    >
                              <span className="d-block text-muted text-xs"
                              >13% APR</span
                              >
                            </div>
                            <div
                              className="ms-auto d-block text-heading text-sm fw-semibold"
                            >
                              760 XRP
                            </div>
                          </div>
                          <div className="progress bg-body-tertiary">

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-0 d-xxl-none"/>
                <div className="card border-0 border-xxl">
                  <div className="card-body p-0 p-xxl-6">
                    <div
                      className="d-flex justify-content-between align-items-center mb-4"
                    >
                      <div><h5>Subscriptions</h5></div>
                      <div>
                              <span className="text-success fw-bold"
                              ><i className="bi bi-arrow-up me-2"></i>7.8%</span
                              >
                      </div>
                    </div>
                    <div className="d-flex flex-nowrap gap-2 scrollable-x">
                      <div className="flex-none">
                        <div
                          className="rounded-3 p-3 p-sm-4 bg-body-secondary"
                        >
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src="https://satoshi.webpixels.io/img/social/youtube.svg"
                              className="w-rem-5"
                              alt="..."
                            />
                            <h6 className="text-sm fw-semibold">Youtube</h6>
                          </div>
                          <div className="mt-4 fw-bold text-heading">
                            $10.99
                          </div>
                        </div>
                      </div>
                      <div className="flex-none">
                        <div
                          className="rounded-3 p-3 p-sm-4 bg-body-secondary"
                        >
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src="https://satoshi.webpixels.io/img/social/spotify.svg"
                              className="w-rem-5"
                              alt="..."
                            />
                            <h6 className="text-sm fw-semibold">Spotify</h6>
                          </div>
                          <div className="mt-4 fw-bold text-heading">
                            $7.99
                          </div>
                        </div>
                      </div>
                      <div className="flex-none">
                        <div
                          className="rounded-3 p-3 p-sm-4 bg-body-secondary"
                        >
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src="https://satoshi.webpixels.io/img/social/github.svg"
                              className="w-rem-5"
                              alt="..."
                            />
                            <h6 className="text-sm fw-semibold">GitHub</h6>
                          </div>
                          <div className="mt-4 fw-bold text-heading">
                            $4.00
                          </div>
                        </div>
                      </div>
                      <div className="flex-none">
                        <div
                          className="rounded-3 p-3 p-sm-4 bg-body-secondary"
                        >
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src="https://satoshi.webpixels.io/img/social/slack.svg"
                              className="w-rem-5"
                              alt="..."
                            />
                            <h6 className="text-sm fw-semibold">Slack</h6>
                          </div>
                          <div className="mt-4 fw-bold text-heading">
                            $12.00
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <a href="#" className="link-primary fw-semibold text-sm"
                      >Manage subcriptions</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}