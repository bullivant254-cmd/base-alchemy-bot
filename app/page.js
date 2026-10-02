export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      background: '#07111f',
      color: '#f1f5f9',
      fontFamily: 'Arial, sans-serif',
      padding: '32px',
    }}>
      <div style={{ maxWidth: 820, width: '100%' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>Base Alchemy Bot</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#dfe8f5' }}>
          Monitor Base gas prices, RPC health, and arbitrage workflow status from a clean
          Next.js dashboard ready for Vercel deployment.
        </p>

        <div style={{
          marginTop: '2rem',
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}>
          <Card title="Network" value="Base Mainnet" />
          <Card title="RPC" value="Alchemy" />
          <Card title="Status" value="Ready" />
        </div>
      </div>
    </main>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      background: 'rgba(16, 29, 50, 0.9)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16,
      padding: '1.25rem',
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    }}>
      <div style={{ color: '#8fa8c7', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {title}
      </div>
      <div style={{ marginTop: '0.8rem', fontSize: '1.4rem', fontWeight: 700 }}>{value}</div>
    </div>
  );
}
