# Base Alchemy Arbitrage Bot

This repository contains a clean, deployable Next.js 14 app for Vercel with Base RPC integration and a dashboard UI.

## Setup

1. Copy `.env.example` to `.env.local` and fill in your real values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run locally:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Environment Variables

- `ALCHEMY_API_KEY`
- `BASE_RPC_URL`
- `SIGNER_PRIVATE_KEY`
- `NEXT_PUBLIC_SIGNER_ADDRESS`
- `ARBITRAGE_CONTRACT_ADDRESS`

## Vercel Deployment

Import the repository in Vercel and set the root directory to the project root if the app is at the repo root. Add environment variables in the Vercel dashboard and deploy.
