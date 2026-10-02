# Base Alchemy Bot

High-performance Base network flash-loan arbitrage bot with Next.js 14 Alchemy RPC dashboard and Vercel deployment.

## Project Structure

- `nextjs-app/` — Next.js 14 app (Vercel root directory)
- `base_alchemy_bot_deployment.md` — Deployment guide and configuration
- `bot.js` — Optional bot script for flash-loan execution

## Quick Start

### Local Development

```bash
cd nextjs-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
cd nextjs-app
npm run build
npm start
```

## Vercel Deployment

### Step 1: Root Directory

Set the root directory to:

```
nextjs-app
```

### Step 2: Environment Variables

Add these to your Vercel project:

```
ALCHEMY_API_KEY=your_alchemy_api_key
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/your_key
SIGNER_PRIVATE_KEY=0xYOUR_PRIVATE_KEY
NEXT_PUBLIC_SIGNER_ADDRESS=0xYOUR_SIGNER_ADDRESS
ARBITRAGE_CONTRACT_ADDRESS=0xYOUR_CONTRACT_ADDRESS
NEXT_PUBLIC_ARBITRAGE_CONTRACT_ADDRESS=0xYOUR_CONTRACT_ADDRESS
```

### Step 3: Build Settings

- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`

### Step 4: Deploy

Click Deploy on Vercel and your app will be live!

## Dashboard Features

- MetaMask wallet connection
- Real-time wallet balance display
- Environment configuration status checker
- Base RPC health endpoint
- Client-side wallet management with ethers.js

## API Endpoints

- `GET /api/health` — Server health check with environment status

## Smart Contract Integration

Update the `ARBITRAGE_CONTRACT_ADDRESS` with your deployed flash-loan arbitrage contract on Base mainnet.
