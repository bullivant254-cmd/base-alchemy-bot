"use client";

import { useState } from "react";

export default function HomePage() {
  const [status, setStatus] = useState("Idle");
  const [result, setResult] = useState(null);

  async function scanBase() {
    setStatus("Scanning Base...");
    const res = await fetch("/api/scan");
    const data = await res.json();
    setResult(data);
    setStatus("Scan complete");
  }

  async function executeBot() {
    setStatus("Executing flash loan...");
    const res = await fetch("/api/execute", { method: "POST" });
    const data = await res.json();
    setResult(data);
    setStatus("Execution complete");
  }

  return (
    <main className="page-shell">
      <section className="card hero-card">
        <p className="eyebrow">Base Arbitrage Ops</p>
        <h1>Base Alchemy Bot Dashboard</h1>
        <p className="description">
          Monitor your Base-connected wallet, scan network status, and trigger the
          arbitrage bot execution flow.
        </p>
      </section>

      <section className="grid two-col">
        <button onClick={scanBase} className="primary-button">Scan Base</button>
        <button onClick={executeBot} className="primary-button">Execute Bot</button>
      </section>

      <section className="card config-card">
        <h2>Status</h2>
        <p>{status}</p>
        <pre>{result ? JSON.stringify(result, null, 2) : "No result yet."}</pre>
      </section>
    </main>
  );
}
