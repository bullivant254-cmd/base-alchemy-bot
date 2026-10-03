# Base Alchemy Bot - Flash Loan Arbitrage Dashboard

A high-performance Base network flash-loan arbitrage bot with Next.js 14 dashboard and Vercel deployment.

## Features
- Real-time Base network status monitoring
- Wallet balance and gas price tracking
- Flash-loan execution interface
- Alchemy RPC integration
- Next.js 14 server-side rendering

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Alchemy API key
- Base network wallet with funds
- Deployed arbitrage contract on Base

### Local Development

```bash
cd nextjs-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Vercel Deployment

1. Create a new Vercel project
2. Import the repository: `bullivant254-cmd/base-alchemy-bot`
3. Set Root Directory to: `nextjs-app`
4. Configure environment variables (see below)
5. Deploy

## Environment Variables

Set these in Vercel or `.env.local`:

```
ALCHEMY_API_KEY=your_alchemy_api_key
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/your_key
SIGNER_PRIVATE_KEY=0x...
NEXT_PUBLIC_SIGNER_ADDRESS=0x...
ARBITRAGE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_ARBITRAGE_CONTRACT_ADDRESS=0x...
```

## API Routes

### GET /api/scan
Scans Base network and returns:
- Network status
- Wallet address and balance
- Contract readiness
- Gas prices

### POST /api/execute
Executes the flash-loan arbitrage:
- Initiates USDC flash loan
- Submits transaction to Base
- Returns transaction hash and confirmation

## Project Structure

```
base-alchemy-bot/
├── nextjs-app/
│   ├── app/
│   │   ├── api/
│   │   │   ├── scan/
│   │   │   └── execute/
│   │   ├── page.js
│   │   └── layout.js
│   ├── lib/
│   │   └── base.js
│   ├── package.json
│   └── next.config.js
└── README.md
```

## Security

- Private keys are stored only in Vercel environment variables
- Never commit sensitive data to the repository
- Use separate wallet for testing vs production

## License

MIT
