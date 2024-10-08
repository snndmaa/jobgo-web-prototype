  import React, { FC, useMemo } from "react";
  import { BrowserRouter as Router } from "react-router-dom";
  import BaseRouter from "./routes";
  import 'bootstrap/dist/css/bootstrap.min.css';

  import { clusterApiUrl } from "@solana/web3.js";
  import {
    ConnectionProvider,
  } from "@solana/wallet-adapter-react";
  import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
  import {
    WalletProvider,
  } from "@solana/wallet-adapter-react";


  const App: FC = () => {

    const network = WalletAdapterNetwork.Devnet;
    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={useMemo(()=>[], [])} autoConnect>
          <React.Fragment>
            <Router>
              <div
                id="page-container"
                className="enable-page-overlay side-scroll page-header-fixed page-header-dark main-content-narrow side-trans-enabled"
              >
                <BaseRouter />
              </div>
            </Router>
          </React.Fragment>
        </WalletProvider>
      </ConnectionProvider>
    );
  };

  export default App;
