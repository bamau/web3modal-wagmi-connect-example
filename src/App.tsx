import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useChainId, useDisconnect, useSwitchChain } from "wagmi";
import "./App.css";

function App() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  console.log("Log - chainId:", chainId);
  console.log("Log - Number(chainId) !== 43113:", Number(chainId) !== 43113);
  return (
    <div className='bg-black'>
      <h1 className='text-white'>Vite + React</h1>
      <div className='card text-white'>
        <button className='mr-4 mb-4' onClick={() => (address ? disconnect() : open())}>
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
        </button>
        <button onClick={() => (Number(chainId) !== 43113 ? switchChain({ chainId: 43113 }) : {})}>
          {" "}
          {Number(chainId) !== 43113 ? "Switch Chain" : "Correct chain"}{" "}
        </button>
      </div>
    </div>
  );
}

export default App;
