"use client";

import { useEffect, useState } from "react";
import { Connector, useAccount, useConnect, useConnectors } from "wagmi";

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
  const { connector: activeConnector } = useAccount();
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

  const [userAgentStr, setUserAgentStr] = useState("");
  useEffect(() => {
    setUserAgentStr(navigator.userAgent);
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-lg">
        <div className="space-y-4">
          <div className="p-2 flex flex-col gap-2">
            <button
              className="h-10 px-4 rounded bg-[#F5841F]"
              onClick={async () => {
                const connector = findMetaMaskConnector(connectors);
                if (!connector) {
                  alert("no metamask connector");
                  return;
                }
                await connectAsync({ connector });
              }}
            >
              connect metamask direct
            </button>

            <button
              className="h-10 px-4 rounded bg-black text-white"
              onClick={async () => {
                const connector = findOkxConnector(connectors);
                if (!connector) {
                  alert("no okx connector");
                  return;
                }
                await connectAsync({ connector });
              }}
            >
              connect okx direct
            </button>

            <div className="border-t border-t-neutral-200 my-4"></div>

            <button className="h-10 px-4 rounded bg-[#F5841F]" onClick={jumpToMetaMaskApp}>
              open link in metamask app
            </button>
            <button className="h-10 px-4 rounded bg-black text-white" onClick={jumpToOkxApp}>
              open link in okx app
            </button>

            <div className="border-t border-t-neutral-200 my-4"></div>

            <button
              className="h-10 px-4 rounded bg-[#F5841F]"
              onClick={async () => {
                const connector = findMetaMaskConnector(connectors);
                if (!connector) {
                  jumpToMetaMaskApp();
                  return;
                }
                await connectAsync({ connector });
              }}
            >
              connect metamask or open link in metamask
            </button>

            <button
              className="h-10 px-4 rounded bg-black text-white"
              onClick={async () => {
                const connector = findOkxConnector(connectors);
                if (!connector) {
                  jumpToOkxApp();
                  return;
                }
                await connectAsync({ connector });
              }}
            >
              connect okx or open link in okx
            </button>

            <div className="border-t border-t-neutral-200 my-4"></div>

            <div>
              <h1 className="font-bold">navigator.userAgent</h1>
              <div className="py-1 text-sm">{userAgentStr}</div>
            </div>

            <div className="border-t border-t-neutral-200 my-4"></div>

            <table className="border-collapse table-auto w-full text-sm">
              <thead>
                <tr>
                  <th className="border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">id</th>
                  <th className="border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">name</th>
                  <th className="border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">connected</th>
                </tr>
              </thead>
              <tbody>
                {connectors.map((connector) => (
                  <tr key={connector.id}>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">{connector.id}</td>
                    <td className="border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">{connector.name}</td>
                    <td className="border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">{connector.id === activeConnector?.id ? "✅" : "🚫"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
