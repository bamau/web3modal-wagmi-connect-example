import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useChainId, useDisconnect, useSwitchChain } from "wagmi";
import "./App.css";

function App() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  return (
    <>
      <h1>Vite + React</h1>
      <div className='card'>
        <button className='mr-4 mb-4' onClick={() => (address ? disconnect() : open())}>
          {address ? address : "Connect Wallet"}
        </button>
        <button onClick={() => (Number(chainId) !== 43113 ? switchChain({ chainId: 43113 }) : {})}>
          {" "}
          {Number(chainId) !== 43113 ? "Switch Chain" : "Correct chain"}{" "}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
