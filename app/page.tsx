"use client";

import { Connector, useConnect, useConnectors } from "wagmi";

function findMetaMaskConnector(connectors: readonly Connector[]) {
  return connectors.find((c) => c.id === "io.metamask" || c.id === "io.metamask.mobile");
}

function findOkxConnector(connectors: readonly Connector[]) {
  return connectors.find((c) => c.id === "com.okex.wallet");
}

function isMetaMaskConnector(connector?: Connector) {
  return connector?.id === "io.metamask" || connector?.id === "io.metamask.mobile";
}

function isOkxConnector(connector?: Connector) {
  return connector?.id === "com.okex.wallet";
}

// 参考 okx 文档: https://www.okx.com/web3/build/docs/waas/app-universal-link
function jumpToOkxApp() {
  const encodedDappUrl = encodeURIComponent(window.location.href);
  const deepLink = "okx://wallet/dapp/url?dappUrl=" + encodedDappUrl;
  const encodedUrl = "https://www.okx.com/download?deeplink=" + encodeURIComponent(deepLink);
  window.location.href = encodedUrl;
}

function jumpToMetaMaskApp() {
  // 使用 metamask 工具: https://metamask.github.io/metamask-deeplinks/
  // 不 encode
  let url = `https://metamask.app.link/dapp/${window.location.href}`;
  window.location.href = url;
}

export default function Home() {
  const { connectAsync } = useConnect();
  const connectors = useConnectors();

  const connectMetamask = async () => {
    const connector = findMetaMaskConnector(connectors);
    if (!connector) {
      alert("no metamask connector");
      return;
    }
    await connectAsync({ connector });
  };

  const connectOkx = async () => {
    const connector = findOkxConnector(connectors);
    if (!connector) {
      alert("no okx connector");
      return;
    }
    await connectAsync({ connector });
  };

  return (
    <div>
      <div className="mx-auto max-w-3xl">
        <div className="space-y-4">
          <div className="border border-purple-300 p-2">
            <button className="h-10 px-2 rounded bg-[#F5841F]" onClick={connectMetamask}>
              connect metamask
            </button>
          </div>
          <div className="border border-purple-300 p-2">
            <button className="h-10 px-2 rounded bg-black text-white" onClick={connectOkx}>
              connect okx
            </button>
          </div>

          <div className="border border-purple-300 p-2">
            <button onClick={jumpToMetaMaskApp}>open link in metamask app</button>
          </div>

          <div className="border border-purple-300 p-2">
            <button onClick={jumpToOkxApp}>open link in okx app</button>
          </div>

          <div className="border border-purple-300 p-2">
            {connectors.map((connector) => (
              <div key={connector.id}>
                {connector.id}: {connector.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
