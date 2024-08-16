
import { avalanche, avalancheFuji } from "@wagmi/chains";
import { defaultWagmiConfig } from "@web3modal/wagmi";


// Get projectId at https://cloud.walletconnect.com
export const projectId = "7525b3664a4f27247510d800707affb2";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Wagmi + Web 3 Modal",
  description: "Wagmi + Web 3 Modal",
  url: "https://web3modal-wagmi-connect-example.vercel.app", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Define chains
const chains = [avalanche, avalancheFuji] as const;

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains,
  projectId, // required
  metadata, // required
})
