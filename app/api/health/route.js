:root {
  --bg: #07111f;
  --panel: rgba(16, 29, 50, 0.9);
  --panel-alt: #101d32;
  --line: rgba(255, 255, 255, 0.08);
  --text: #f8fafc;
  --muted: #9fb3c8;
  --green: #34d399;
  --amber: #fbbf24;
  --red: #f87171;
}

html,
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(180deg, #07111f 0%, #0b1729 100%);
  color: var(--text);
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
}

.page-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;
}

.dashboard {
  width: min(980px, 100%);
  background: rgba(11, 21, 33, 0.8);
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.18);
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.72rem;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

h2 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 118px;
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
}

.status-badge.live {
  background: rgba(52, 211, 153, 0.15);
  color: var(--green);
}

.status-badge.demo {
  background: rgba(251, 191, 36, 0.15);
  color: var(--amber);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.stat-card {
  position: relative;
  overflow: hidden;
  padding: 18px 20px 20px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 18px;
}

.accent {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 4px;
}

.accent.green { background: var(--green); }
.accent.amber { background: var(--amber); }
.accent.red { background: var(--red); }

.label {
  display: block;
  margin-top: 14px;
  color: var(--muted);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.stat-card strong {
  display: block;
  margin-top: 10px;
  font-size: clamp(1.3rem, 2vw, 1.8rem);
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 20px;
}

.panel p {
  margin: 0;
  word-break: break-all;
  line-height: 1.6;
}

.muted {
  color: var(--muted);
  margin-top: 8px !important;
}

ul {
  margin: 0;
  padding-left: 18px;
  line-height: 1.8;
  color: var(--muted);
}
