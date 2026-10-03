# Base Alchemy Bot - Deployment Ready

## For Deployment on Vercel:

1. **Project Name:** `base-alchemy-bot-prod` (or unique name)
2. **Root Directory:** `nextjs-app`
3. **Build Command:** `next build`
4. **Output Directory:** `.next`
5. **Install Command:** `npm install`

## Environment Variables (Add in Vercel):

- ALCHEMY_API_KEY
- BASE_RPC_URL
- SIGNER_PRIVATE_KEY
- NEXT_PUBLIC_SIGNER_ADDRESS
- ARBITRAGE_CONTRACT_ADDRESS
- NEXT_PUBLIC_ARBITRAGE_CONTRACT_ADDRESS

## Notes:

- Do NOT use `cd nextjs-app` in any commands
- The root directory setting handles the folder navigation
- This configuration avoids build errors
