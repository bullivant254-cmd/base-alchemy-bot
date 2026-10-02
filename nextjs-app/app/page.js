"use client";

import { useEffect, useState } from "react";
import { BrowserProvider, formatEther } from "ethers";

const envKeys = [
  "ALCHEMY_API_KEY",
  "BASE_RPC_URL",
  "SIGNER_PRIVATE_KEY",
  "NEXT_PUBLIC_SIGNER_ADDRESS",
  "ARBITRAGE_CONTRACT_ADDRESS",
  "NEXT_PUBLIC_ARBITRAGE_CONTRACT_ADDRESS",
];

function getEnvValue(key) {
  return process.env[key] || process.env[`NEXT_PUBLIC_${key}`] || "Not configured";
}

export default function HomePage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("0");
  const [status, setStatus] = useState("Checking wallet availability...");
  const [providerReady, setProviderReady] = useState(false);
  const [envStatus, setEnvStatus] = useState([]);

  useEffect(() => {
    const values = envKeys.map((key) => ({
      key,
      value: getEnvValue(key),
      configured: getEnvValue(key) !== "Not configured",
    }));
    setEnvStatus(values);

    if (typeof window !== "undefined" && window.ethereum) {
      setProviderReady(true);
      setStatus("Wallet provider detected.");
    } else {
      setStatus("MetaMask or a compatible wallet is not installed.");
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setStatus("MetaMask is required to connect a wallet.");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const rawBalance = await provider.getBalance(address);

      setWalletAddress(address);
      setBalance(formatEther(rawBalance));
      setStatus(`Connected: ${address}`);
    } catch (error) {
      setStatus(error?.message || "Wallet connection failed.");
    }
  };

  const signerAddress = getEnvValue("NEXT_PUBLIC_SIGNER_ADDRESS");
  const arbitrageContract =
    getEnvValue("NEXT_PUBLIC_ARBITRAGE_CONTRACT_ADDRESS") ||
    getEnvValue("ARBITRAGE_CONTRACT_ADDRESS");
  const baseRpc = getEnvValue("BASE_RPC_URL");

  return (
    <main className="page-shell">
      <section className="card hero-card">
        <p className="eyebrow">Base Arbitrage Ops</p>
        <h1>Base Alchemy Bot Dashboard</h1>
        <p className="description">
          Monitor your Base-connected wallet, health checks, and deployment
          configuration for an automated arbitrage workflow.
        </p>
      </section>

      <section className="grid two-col">
        <div className="card metric-card">
          <span className="label">Wallet status</span>
          <strong>{status}</strong>
        </div>
        <div className="card metric-card">
          <span className="label">Provider</span>
          <strong>{providerReady ? "Ready" : "Unavailable"}</strong>
        </div>
      </section>

      <section className="grid three-col">
        <div className="card metric-card">
          <span className="label">Connected signer</span>
          <strong>{walletAddress || signerAddress}</strong>
        </div>
        <div className="card metric-card">
          <span className="label">Wallet balance</span>
          <strong>{walletAddress ? `${balance} ETH` : "Awaiting wallet"}</strong>
        </div>
        <div className="card metric-card">
          <span className="label">Contract</span>
          <strong>{arbitrageContract}</strong>
        </div>
      </section>

      <section className="card action-card">
        <button onClick={connectWallet} className="primary-button">
          Connect Wallet
        </button>
      </section>

      <section className="card config-card">
        <h2>Environment Status</h2>
        <ul className="env-list">
          {envStatus.map((item) => (
            <li key={item.key} className={item.configured ? "configured" : "missing"}>
              <span>{item.key}</span>
              <strong>{item.configured ? "✓ configured" : "✗ missing"}</strong>
            </li>
          ))}
        </ul>
        <div className="rpc-box">
          <span className="label">Base RPC URL</span>
          <code>{baseRpc}</code>
        </div>
      </section>
    </main>
  );
}
