# Base Alchemy Bot Deployment Guide

## Repository Structure

This repository is organized for Vercel deployment from the `nextjs-app` subfolder.

## Vercel Configuration

### 1. Root Directory

```
nextjs-app
```

### 2. Build Settings

- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`

### 3. Environment Variables

Add these variables in your Vercel project settings:

| Key | Value | Description |
|-----|-------|-------------|
| `ALCHEMY_API_KEY` | your_alchemy_api_key | Alchemy API key for Base access |
| `BASE_RPC_URL` | https://base-mainnet.g.alchemy.com/v2/your_key | Base mainnet RPC endpoint |
| `SIGNER_PRIVATE_KEY` | 0x... | Hot-wallet private key |
| `NEXT_PUBLIC_SIGNER_ADDRESS` | 0x... | Signer wallet address (public) |
| `ARBITRAGE_CONTRACT_ADDRESS` | 0x... | Flash-loan arbitrage contract |
| `NEXT_PUBLIC_ARBITRAGE_CONTRACT_ADDRESS` | 0x... | Contract address (public) |

## Local Testing

### Install Dependencies

```bash
cd nextjs-app
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

### Run Production Build

```bash
npm run build
npm start
```

### Test Health Endpoint

```bash
curl http://localhost:3000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "env": {
    "ALCHEMY_API_KEY": true,
    "BASE_RPC_URL": true,
    "SIGNER_PRIVATE_KEY": true,
    "NEXT_PUBLIC_SIGNER_ADDRESS": true,
    "ARBITRAGE_CONTRACT_ADDRESS": true,
    "NEXT_PUBLIC_ARBITRAGE_CONTRACT_ADDRESS": true
  },
  "timestamp": "2026-10-02T23:22:32Z"
}
```

## Dashboard Features

1. **Wallet Connection** — Click "Connect Wallet" to link MetaMask
2. **Wallet Balance** — Displays connected wallet's ETH balance
3. **Environment Status** — Shows which env vars are configured
4. **RPC Health** — Displays your Base RPC endpoint

## Deployment Steps

1. Import this repository in Vercel
2. Set Root Directory to `nextjs-app`
3. Add environment variables
4. Click Deploy
5. Your app will be live on a Vercel URL

## Troubleshooting

### Build Fails

- Check that `nextjs-app` is set as the root directory
- Verify all environment variables are added
- Run `npm run build` locally to test

### Wallet Not Connecting

- Ensure MetaMask is installed in your browser
- Check that you're on the Base network in MetaMask
- Verify browser console for errors

### Missing Environment Variables

Check the `/api/health` endpoint to see which vars are missing.
