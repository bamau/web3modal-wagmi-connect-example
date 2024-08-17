import React from "react";
import ReactDOM from "react-dom/client";

import { MetaMaskProvider } from "@metamask/sdk-react";
import { App } from "./App";

import './styles.scss';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Example React Dapp",
          url: window.location.href,
        },
        infuraAPIKey: "3da826baca7645a18ab1b928f4514e0f",
        // Other options.
      }}
    >
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);
