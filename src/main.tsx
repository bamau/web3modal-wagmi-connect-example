import React from "react";
import ReactDOM from "react-dom/client";


// import App from "./App";

// // 0. Setup queryClient
// const queryClient = new QueryClient();

// // 1. Get projectId at https://cloud.walletconnect.com
// const projectId = "7525b3664a4f27247510d800707affb2";
// if (!projectId) throw new Error("Project ID is undefined");

// // 2. Create wagmiConfig
// const metadata = {
//   name: "Web3Modal",
//   description: "Web3Modal Example",
//   url: "https://web3modal.com",
//   icons: ["https://avatars.githubusercontent.com/u/37784886"],
// };

// // Define chains
// const chains = [mainnet, arbitrum, flowTestnet] as const;

// const wagmiConfig = createConfig({
//   chains, // Use the defined chains here
//   transports: {
//     [flowTestnet.id]: http(),
//     [mainnet.id]: http(),
//     [arbitrum.id]: http(),
//   },
//   connectors: [
//     walletConnect({ projectId, metadata, showQrModal: false }),
//     coinbaseWallet({
//       appName: metadata.name,
//       appLogoUrl: metadata.icons[0],
//     }),
//   ],
// });

// // 3. Create modal
// createWeb3Modal({ wagmiConfig, projectId, allowUnsupportedChain: true });

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <WagmiProvider config={wagmiConfig}>
//       <QueryClientProvider client={queryClient}>
//         <App />
//       </QueryClientProvider>
//     </WagmiProvider>
//   </React.StrictMode>
// );


import { MetaMaskProvider } from "@metamask/sdk-react";
import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Example React Dapp",
          url: window.location.href,
        },
        infuraAPIKey: '3da826baca7645a18ab1b928f4514e0f',
        // Other options.
      }}
    >
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);
