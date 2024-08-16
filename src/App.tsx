//

import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";

export const App = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, provider, chainId } = useSDK();
  console.log("Log - chainId:", chainId);
  console.log("Log - provider:", provider);

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      console.log("Log - accounts:", accounts);
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };
  const disconnect = async () => {
    try {
      await sdk?.disconnect();
      setAccount("");
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  const changeNetwork = async (hexChainId: string) => {
    console.debug(`switching to network chainId=${hexChainId}`);
    try {
      const response = await provider?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexChainId }], // chainId must be in hexadecimal numbers
      });
      console.debug(`response`, response);
    } catch (err) {
      console.error(err);
    }
  };

  const addEthereumChain = () => {
    if (!provider) {
      throw new Error(`invalid ethereum provider`);
    }


    provider
      .request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x221',
            chainName: 'Flow testnet',
            blockExplorerUrls: ['https://evm-testnet.flowscan.io'],
            nativeCurrency: { symbol: 'FLOW', decimals: 18 },
            rpcUrls: ['https://testnet.evm.nodes.onflow.org'],
          },
        ],
      })
      .then((res) => console.log('add', res))
      .catch((e) => console.log('ADD ERR', e));
  };


  return (
    <div className='App'>
      <button style={{ padding: 10, margin: 10 }} onClick={connect}>
        Connect
      </button>
      <button style={{ padding: 10, margin: 10 }} onClick={disconnect}>
        Disconnect
      </button>
      <button style={{ padding: 10, margin: 10 }} onClick={addEthereumChain}>
        Add chain Flow
      </button>
      {Number(chainId) !== 545 && (
        <button style={{ padding: 10, margin: 10 }} onClick={() => changeNetwork("0x221")}>
          Switch to FLOW network
        </button>
      )}
      {connected && (
        <div>
          <>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {account && `Connected account: ${account}`}
          </>
        </div>
      )}
    </div>
  );
};
