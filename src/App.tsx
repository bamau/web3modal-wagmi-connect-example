import { useSDK } from "@metamask/sdk-react";

export const App = () => {
  const { sdk, provider, chainId, account } = useSDK();
  console.log("Log - account:", account);

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };
  const disconnect = async () => {
    try {
      await sdk?.terminate();
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
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x221",
            chainName: "Flow testnet",
            blockExplorerUrls: ["https://evm-testnet.flowscan.io"],
            nativeCurrency: { symbol: "FLOW", decimals: 18 },
            rpcUrls: ["https://testnet.evm.nodes.onflow.org"],
          },
        ],
      })
      .then((res) => console.log("add", res))
      .catch((e) => console.log("ADD ERR", e));
  };

  return (
    <div className='flex justify-center items-center min-h-screen text-white flex-col'>
      <div className='flex flex-col gap-4'>
        <button
          className='bg-green-900 rounded-md'
          style={{ padding: 10, margin: 10 }}
          onClick={account ? disconnect : connect}
        >
          {account ? "Disconnect" : "Connect"}
        </button>

        {account && (
          <>
            <button className='bg-green-900 rounded-md' style={{ padding: 10, margin: 10 }} onClick={addEthereumChain}>
              Add chain Flow
            </button>
            {Number(chainId) !== 545 && (
              <button
                className='bg-green-900 rounded-md'
                style={{ padding: 10, margin: 10 }}
                onClick={() => changeNetwork("0x221")}
              >
                Switch to FLOW network
              </button>
            )}
            <div className='flex flex-col justify-center items-center text-xl gap-2'>
              <span>{chainId && `Connected chain: ${Number(chainId)}`}</span>
              <span>{account && `Connected account: ${account}`}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
