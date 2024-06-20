import WalletConnect from "../components/wallet-connect.tsx";
import {useEffect, useState} from "react";
import {SigningArchwayClient} from "@archwayhq/arch3.js";
import {proposeLoanDisbursement, queryLoanOffers} from "../services/contract-service.ts";
import { TestnetChainInfo as chainInfo} from "../configs/ChainInfo.ts";
import Navbar from "../components/navbar.tsx";


export default function DashboardPage() {

  const [walletConnected, setWalletConnected] = useState(false)
  const [client, setClient] = useState<SigningArchwayClient>()
  const [signerAddress, setSignerAddress] = useState<string>('')

  useEffect(() => {
    async function buildClient() {
      if (localStorage.getItem("wallet_connected") && window.getOfflineSigner) {
        setWalletConnected(true);
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
    }
  }, [client]);

  const getBalance = async () => {
    if (!client) {
      alert("connect wallet.");
      return;
    }
    const coin = await client.getBalance(signerAddress, "CONST")
    console.log(coin)
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
    queryLoanOffers(client, entrypoint)
  }

  const proposeLoan = () => {
    if (!client) return;
    const propose_loan_offer = {
      loan_offer: "loan_disbursment_request",
      title: "rickle berry loan",
      description: "rickle berry loan for an exchange of eth",
    }
    proposeLoanDisbursement(client, signerAddress, {propose_loan_offer});
  }


  return (
    <main className="container-fluid px-3 py-5 p-lg-6 p-xxl-8">
      <div className="mb-6 mb-xl-10">
        <div className="row g-3 align-items-center">
          <div className="col">
            <h1 className="ls-tight text-start">Dashboard</h1>
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
        className="modal fade" id="cryptoModal" aria-hidden="true"
        tabIndex={-1} aria-labelledby="cryptoModalLabel"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content overflow-hidden">
            <div className="modal-header pb-0 border-0">
              <h1 className="modal-title h4" id="cryptoModalLabel">
                Select token
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-0">
              <div className="px-6 py-5 border-bottom">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search token or paste address"
                  aria-label="Search"
                />
              </div>
              <div className="p-2">
                <div className="vstack">
                  <div
                    className="position-relative d-flex gap-3 p-4 rounded bg-body-secondary-hover"
                  >
                    <div className="icon flex-none">
                      <img
                        src="https://satoshi.webpixels.io/img/crypto/color/btc.svg"
                        className="w-rem-10 h-rem-10"
                        alt="..."
                      />
                    </div>
                    <div className="d-flex flex-fill">
                      <div className="">
                        <a
                          href="#"
                          className="stretched-link text-heading fw-bold"
                        >BTC</a
                        >
                        <span className="d-block text-muted text-sm"
                        >Bitcoin</span
                        >
                      </div>
                      <div className="ms-auto fw-bold text-heading">23.8</div>
                    </div>
                  </div>
                  <div
                    className="position-relative d-flex gap-3 p-4 rounded bg-body-secondary-hover"
                  >
                    <div className="icon flex-none">
                      <img
                        src="https://satoshi.webpixels.io/img/crypto/color/eth.svg"
                        className="w-rem-10 h-rem-10"
                        alt="..."
                      />
                    </div>
                    <div className="d-flex flex-fill">
                      <div className="">
                        <a
                          href="#"
                          className="stretched-link text-heading fw-bold"
                        >ETH</a
                        >
                        <span className="d-block text-muted text-sm"
                        >Ethereum</span
                        >
                      </div>
                      <div className="ms-auto fw-bold text-heading">
                        1.200,50
                      </div>
                    </div>
                  </div>
                  <div
                    className="position-relative d-flex gap-3 p-4 rounded bg-body-secondary-hover"
                  >
                    <div className="icon flex-none">
                      <img
                        src="https://satoshi.webpixels.io/img/crypto/color/ada.svg"
                        className="w-rem-10 h-rem-10"
                        alt="..."
                      />
                    </div>
                    <div className="d-flex flex-fill">
                      <div className="">
                        <a
                          href="#"
                          className="stretched-link text-heading fw-bold"
                        >ADA</a
                        >
                        <span className="d-block text-muted text-sm"
                        >Cardano</span
                        >
                      </div>
                      <div className="ms-auto fw-bold text-heading">
                        10.930,00
                      </div>
                    </div>
                  </div>
                  <div
                    className="position-relative d-flex gap-3 p-4 rounded bg-body-secondary-hover"
                  >
                    <div className="icon flex-none">
                      <img
                        src="https://satoshi.webpixels.io/img/crypto/color/bnb.svg"
                        className="w-rem-10 h-rem-10"
                        alt="..."
                      />
                    </div>
                    <div className="d-flex flex-fill">
                      <div className="">
                        <a
                          href="#"
                          className="stretched-link text-heading fw-bold"
                        >BNB</a
                        >
                        <span className="d-block text-muted text-sm"
                        >Binance</span
                        >
                      </div>
                      <div className="ms-auto fw-bold text-heading">200</div>
                    </div>
                  </div>
                  <div
                    className="position-relative d-flex gap-3 p-4 rounded bg-body-secondary-hover"
                  >
                    <div className="icon flex-none">
                      <img
                        src="https://satoshi.webpixels.io/img/crypto/color/chain.svg"
                        className="w-rem-10 h-rem-10"
                        alt="..."
                      />
                    </div>
                    <div className="d-flex flex-fill">
                      <div className="">
                        <a
                          href="#"
                          className="stretched-link text-heading fw-bold"
                        >CHAIN</a
                        >
                        <span className="d-block text-muted text-sm"
                        >Linkchain</span
                        >
                      </div>
                      <div className="ms-auto fw-bold text-heading">200</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="px-6 py-5 bg-body-secondary d-flex justify-content-center"
              >
                <button className="btn btn-sm btn-dark">
                  <i className="bi bi-gear me-2"></i>Manage tokens
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3 g-xxl-6">
        <div className="col-xxl-8">
          <div className="vstack gap-3 gap-md-6">
            <div className="row g-3">
              <div className="col-md col-sm-6">
                <div className="card border-primary-hover">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src="https://satoshi.webpixels.io/img/crypto/icon/btc.svg"
                        className="w-rem-5 flex-none"
                        alt="..."
                      />
                      <a
                        href="page-details.html"
                        className="h6 stretched-link"
                      >BTC</a
                      >
                    </div>
                    <div className="text-sm fw-semibold mt-3">
                      3.2893 USDT
                    </div>
                    <div
                      className="d-flex align-items-center gap-2 mt-1 text-xs"
                    >
                            <span className="badge badge-xs bg-success"
                            ><i className="bi bi-arrow-up-right"></i> </span
                            ><span>+13.7%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md col-sm-6">
                <div className="card border-primary-hover">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src="https://satoshi.webpixels.io/img/crypto/icon/ada.svg"
                        className="w-rem-5 flex-none"
                        alt="..."
                      />
                      <a
                        href="page-details.html"
                        className="h6 stretched-link"
                      >ADA</a
                      >
                    </div>
                    <div className="text-sm fw-semibold mt-3">
                      10.745,49 ADA
                    </div>
                    <div
                      className="d-flex align-items-center gap-2 mt-1 text-xs"
                    >
                            <span className="badge badge-xs bg-danger"
                            ><i className="bi bi-arrow-up-right"></i> </span
                            ><span>-3.2%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md col-sm-6">
                <div className="card border-primary-hover">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src="https://satoshi.webpixels.io/img/crypto/icon/eos.svg"
                        className="w-rem-5 flex-none"
                        alt="..."
                      />
                      <a
                        href="page-details.html"
                        className="h6 stretched-link"
                      >EOS</a
                      >
                    </div>
                    <div className="text-sm fw-semibold mt-3">
                      7.890,00 EOS
                    </div>
                    <div
                      className="d-flex align-items-center gap-2 mt-1 text-xs"
                    >
                            <span className="badge badge-xs bg-danger"
                            ><i className="bi bi-arrow-up-right"></i> </span
                            ><span>-2.2%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-1 d-none d-md-block">
                <div
                  className="card h-md-100 d-flex flex-column align-items-center justify-content-center py-4 bg-body-secondary bg-opacity-75 bg-opacity-100-hover"
                >
                  <a
                    href="#cryptoModal"
                    className="stretched-link text-body-secondary"
                    data-bs-toggle="modal"
                  ><i className="bi bi-plus-lg"></i
                  ></a>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body pb-0">
                <div
                  className="d-flex justify-content-between align-items-center"
                >
                  <div><h5>Earnings</h5></div>
                  <div className="hstack align-items-center">
                    <a href="#" className="text-muted"
                    ><i className="bi bi-arrow-repeat"></i
                    ></a>
                  </div>
                </div>
                <div className="mx-n4">
                  <div id="chart-users" data-height="270"></div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body pb-0">
                <div
                  className="d-flex justify-content-between align-items-center"
                >
                  <div><h5>Transaction History</h5></div>
                  <div className="hstack align-items-center">
                    <a href="#" className="text-muted"
                    ><i className="bi bi-arrow-repeat"></i
                    ></a>
                  </div>
                </div>
                <div className="list-group list-group-flush">
                  <div
                    className="list-group-item d-flex align-items-center justify-content-between gap-6"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="icon icon-shape rounded-circle icon-sm flex-none w-rem-10 h-rem-10 text-sm bg-primary bg-opacity-25 text-primary"
                      >
                        <i className="bi bi-send-fill"></i>
                      </div>
                      <div className="">
                              <span
                                className="d-block text-heading text-sm fw-semibold"
                              >Bitcoin </span
                              ><span
                        className="d-none d-sm-block text-muted text-xs"
                      >2 days ago</span
                      >
                      </div>
                    </div>
                    <div className="d-none d-md-block text-sm">
                      0xd029384sd343fd...eq23
                    </div>
                    <div className="d-none d-md-block">
                            <span className="badge bg-body-secondary text-warning"
                            >Pending</span
                            >
                    </div>
                    <div className="text-end">
                            <span className="d-block text-heading text-sm fw-bold"
                            >+0.2948 BTC </span
                            ><span className="d-block text-muted text-xs"
                    >+$10,930.90</span
                    >
                    </div>
                  </div>
                  <div
                    className="list-group-item d-flex align-items-center justify-content-between gap-6"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="icon icon-shape rounded-circle icon-sm flex-none w-rem-10 h-rem-10 text-sm bg-primary bg-opacity-25 text-primary"
                      >
                        <i className="bi bi-send-fill"></i>
                      </div>
                      <div className="">
                              <span
                                className="d-block text-heading text-sm fw-semibold"
                              >Cardano </span
                              ><span
                        className="d-none d-sm-block text-muted text-xs"
                      >2 days ago</span
                      >
                      </div>
                    </div>
                    <div className="d-none d-md-block text-sm">
                      0xd029384sd343fd...eq23
                    </div>
                    <div className="d-none d-md-block">
                            <span className="badge bg-body-secondary text-danger"
                            >Canceled</span
                            >
                    </div>
                    <div className="text-end">
                            <span className="d-block text-heading text-sm fw-bold"
                            >+0.2948 BTC </span
                            ><span className="d-block text-muted text-xs"
                    >+$10,930.90</span
                    >
                    </div>
                  </div>
                  <div
                    className="list-group-item d-flex align-items-center justify-content-between gap-6"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="icon icon-shape rounded-circle icon-sm flex-none w-rem-10 h-rem-10 text-sm bg-primary bg-opacity-25 text-primary"
                      >
                        <i className="bi bi-send-fill"></i>
                      </div>
                      <div className="">
                              <span
                                className="d-block text-heading text-sm fw-semibold"
                              >Binance </span
                              ><span
                        className="d-none d-sm-block text-muted text-xs"
                      >2 days ago</span
                      >
                      </div>
                    </div>
                    <div className="d-none d-md-block text-sm">
                      0xd029384sd343fd...eq23
                    </div>
                    <div className="d-none d-md-block">
                            <span className="badge bg-body-secondary text-success"
                            >Successful</span
                            >
                    </div>
                    <div className="text-end">
                            <span className="d-block text-heading text-sm fw-bold"
                            >+0.2948 BTC </span
                            ><span className="d-block text-muted text-xs"
                    >+$10,930.90</span
                    >
                    </div>
                  </div>
                  <div
                    className="list-group-item d-flex align-items-center justify-content-between gap-6"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="icon icon-shape rounded-circle icon-sm flex-none w-rem-10 h-rem-10 text-sm bg-primary bg-opacity-25 text-primary"
                      >
                        <i className="bi bi-send-fill"></i>
                      </div>
                      <div className="">
                              <span
                                className="d-block text-heading text-sm fw-semibold"
                              >Bitcoin </span
                              ><span
                        className="d-none d-sm-block text-muted text-xs"
                      >2 days ago</span
                      >
                      </div>
                    </div>
                    <div className="d-none d-md-block text-sm">
                      0xd029384sd343fd...eq23
                    </div>
                    <div className="d-none d-md-block">
                            <span className="badge bg-body-secondary text-warning"
                            >Pending</span
                            >
                    </div>
                    <div className="text-end">
                            <span className="d-block text-heading text-sm fw-bold"
                            >+0.2948 BTC </span
                            ><span className="d-block text-muted text-xs"
                    >+$10,930.90</span
                    >
                    </div>
                  </div>
                  <div
                    className="list-group-item d-flex align-items-center justify-content-between gap-6"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="icon icon-shape rounded-circle icon-sm flex-none w-rem-10 h-rem-10 text-sm bg-primary bg-opacity-25 text-primary"
                      >
                        <i className="bi bi-send-fill"></i>
                      </div>
                      <div className="">
                              <span
                                className="d-block text-heading text-sm fw-semibold"
                              >Bitcoin </span
                              ><span
                        className="d-none d-sm-block text-muted text-xs"
                      >2 days ago</span
                      >
                      </div>
                    </div>
                    <div className="d-none d-md-block text-sm">
                      0xd029384sd343fd...eq23
                    </div>
                    <div className="d-none d-md-block">
                            <span className="badge bg-body-secondary text-danger"
                            >Canceled</span
                            >
                    </div>
                    <div className="text-end">
                            <span className="d-block text-heading text-sm fw-bold"
                            >+0.2948 BTC </span
                            ><span className="d-block text-muted text-xs"
                    >+$10,930.90</span
                    >
                    </div>
                  </div>
                  <div
                    className="list-group-item d-flex align-items-center justify-content-between gap-6"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="icon icon-shape rounded-circle icon-sm flex-none w-rem-10 h-rem-10 text-sm bg-primary bg-opacity-25 text-primary"
                      >
                        <i className="bi bi-send-fill"></i>
                      </div>
                      <div className="">
                              <span
                                className="d-block text-heading text-sm fw-semibold"
                              >Bitcoin </span
                              ><span
                        className="d-none d-sm-block text-muted text-xs"
                      >2 days ago</span
                      >
                      </div>
                    </div>
                    <div className="d-none d-md-block text-sm">
                      0xd029384sd343fd...eq23
                    </div>
                    <div className="d-none d-md-block">
                            <span className="badge bg-body-secondary text-success"
                            >Successful</span
                            >
                    </div>
                    <div className="text-end">
                            <span className="d-block text-heading text-sm fw-bold"
                            >+0.2948 BTC </span
                            ><span className="d-block text-muted text-xs"
                    >+$10,930.90</span
                    >
                    </div>
                  </div>
                  <div
                    className="list-group-item d-flex align-items-center justify-content-between gap-6"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="icon icon-shape rounded-circle icon-sm flex-none w-rem-10 h-rem-10 text-sm bg-primary bg-opacity-25 text-primary"
                      >
                        <i className="bi bi-send-fill"></i>
                      </div>
                      <div className="">
                              <span
                                className="d-block text-heading text-sm fw-semibold"
                              >Bitcoin </span
                              ><span
                        className="d-none d-sm-block text-muted text-xs"
                      >2 days ago</span
                      >
                      </div>
                    </div>
                    <div className="d-none d-md-block text-sm">
                      0xd029384sd343fd...eq23
                    </div>
                    <div className="d-none d-md-block">
                            <span className="badge bg-body-secondary text-success"
                            >Successful</span
                            >
                    </div>
                    <div className="text-end">
                            <span className="d-block text-heading text-sm fw-bold"
                            >+0.2948 BTC </span
                            ><span className="d-block text-muted text-xs"
                    >+$10,930.90</span
                    >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-4">
          <div
            className="offcanvas-xxl m-xxl-0 rounded-sm-4 rounded-xxl-0 offcanvas-end overflow-hidden m-sm-4" tabIndex={-1}
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

/**
 * <WalletConnect
 *         walletConnected={walletConnected}
 *         setWalletConnected={setWalletConnected}
 *         setClient={setClient}
 *         setSignerAddress={setSignerAddress}
 *       />
 *       {
 *         walletConnected &&
 *         <div className="card">
 *           <button onClick={proposeLoan}>
 *             Propose Loan Disbursement
 *           </button>
 *           <button onClick={listLoans}>
 *             List Loans
 *           </button>
 *         </div>
 *       }
 *
 * */