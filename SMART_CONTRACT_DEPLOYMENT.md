# Base Flash Loan Contract Deployment Guide

## Environment Setup

### 1. Install Dependencies
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox hardhat-verify dotenv
npm install @openzeppelin/contracts
```

### 2. Configure `.env` File
Create a `.env` file in the root directory with the following:

```env
# Your wallet private key (NEVER commit this to git)
PRIVATE_KEY=your_wallet_private_key_here

# Base Network RPC URLs (optional, defaults are used if not provided)
BASE_SEPOLIA_RPC=https://sepolia.base.org
BASE_MAINNET_RPC=https://mainnet.base.org

# Basescan API Key (for contract verification)
BASESCAN_API_KEY=your_basescan_api_key_here
```

**⚠️ CRITICAL SECURITY NOTES:**
- **NEVER** commit `.env` to Git
- Use a fresh wallet for testing on testnet first
- For mainnet, use a separate wallet with minimal funds

---

## Deployment Steps

### Step 1: Fund Your Wallet on Base Sepolia (Testnet)

1. Get your wallet address:
   ```bash
   node -e "const eth = require('ethers'); console.log(new eth.Wallet('YOUR_PRIVATE_KEY').address)"
   ```

2. Fund it with Base Sepolia ETH from one of these faucets:
   - **Coinbase Faucet**: https://coinbase.com/faucets/base-ethereum-goerli-faucet
   - **Base Faucet**: https://www.basefaucet.io/
   - **Alchemy Faucet**: https://www.alchemy.com/faucets/base-sepolia

Wait for funds to arrive (usually instant to a few minutes).

---

### Step 2: Deploy to Base Sepolia (Testnet)

This is the **recommended first step** to verify everything works:

```bash
npx hardhat run scripts/deploy.ts --network baseSepolia
```

**Expected Output:**
```
Deploying BaseFlashLoan contract to Base Sepolia...
Aave Address Provider: 0x012bf85Da3dE553FBe19f6CAbc1E70DBf652A509
✅ BaseFlashLoan deployed to: 0x1234567890AbCdEf1234567890AbCdEf12345678
🔗 Verify at: https://sepolia.basescan.org/address/0x1234567890AbCdEf1234567890AbCdEf12345678
```

---

### Step 3: Verify Contract on Basescan (Optional but Recommended)

```bash
npx hardhat verify --network baseSepolia <DEPLOYED_CONTRACT_ADDRESS> "0x012bf85Da3dE553FBe19f6CAbc1E70DBf652A509"
```

This allows you to read/write to the contract directly on Basescan.

---

### Step 4: Test Flash Loan on Sepolia

Once deployed, test with a small flash-loan request:

**Via Basescan:**
1. Go to the contract on Basescan
2. Click "Write as Proxy" or "Write Contract"
3. Call `requestFlashLoan()` with:
   - `asset`: `0x1c7D4B196Cb0C6f48415490d5871921d141F69b5` (sUSDe on Base Sepolia)
   - `amount`: `100000000000000000` (0.1 tokens in wei)

**Expected Behavior:**
- Transaction succeeds
- `FlashLoanRequested` event is emitted
- Balance remains unchanged (flash loan is repaid atomically)

---

### Step 5: Deploy to Base Mainnet (After Testing)

**Only proceed after successful testnet testing!**

1. Fund your wallet on Base Mainnet with real ETH (via bridge or exchange)
2. Deploy:
   ```bash
   npx hardhat run scripts/deploy.ts --network baseMainnet
   ```

3. Verify on Basescan:
   ```bash
   npx hardhat verify --network baseMainnet <DEPLOYED_CONTRACT_ADDRESS> "0xe20fCBdBfFC4Dd138cE8b2E6fbB6CB49777ad64D"
   ```

---

## Key Aave V3 Addresses for Base

| Component | Base Mainnet | Base Sepolia |
|-----------|-------------|-------------|
| **Aave V3 Address Provider** | `0xe20fCBdBfFC4Dd138cE8b2E6fbB6CB49777ad64D` | `0x012bf85Da3dE553FBe19f6CAbc1E70DBf652A509` |
| **Pool (Lending)** | `0xA238Dd80C259a72e81d7e4664a9801593F98d1c6` | `0xf3B35cBcAC3EE7342D6B1553CD20343b2f7a0EA8` |
| **USDC** | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` | `0x1c7D4B196Cb0C6f48415490d5871921d141F69b5` |

---

## Flash Loan Fee Structure

- **Fee**: 0.05% of borrowed amount
- **Example**: Borrow 1,000 USDC → Repay 1,000.5 USDC

⚠️ **Critical**: Your arbitrage strategy must generate profit > fee, or the transaction will revert.

---

## Updating Your Next.js App

Once deployed, update your `.env.local`:

```env
# Add this after deployment
ARBITRAGE_CONTRACT_ADDRESS=0x<YOUR_DEPLOYED_CONTRACT_ADDRESS>
```

Update `nextjs-app/lib/base.js`:
```javascript
export function getFlashLoanContract(signerOrProvider = getSigner()) {
  const abi = [
    "function requestFlashLoan(address asset, uint256 amount) external",
    "function withdraw(address token) external",
    "function getBalance(address token) external view returns (uint256)",
  ];

  return new Contract(process.env.ARBITRAGE_CONTRACT_ADDRESS, abi, signerOrProvider);
}
```

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| `Insufficient balance` | Fund your wallet with Base ETH |
| `PRIVATE_KEY not set` | Create `.env` with your private key |
| `Contract reverted` | Flash loan amount too large or RPC error |
| `Not authorized` | Only contract owner can call `requestFlashLoan` |

---

## Security Best Practices

✅ **DO:**
- Test on Sepolia first
- Use a dedicated deployment wallet
- Keep private keys in `.env` (gitignored)
- Verify contracts on Basescan

❌ **DON'T:**
- Commit `.env` to Git
- Use the same wallet for testing and production
- Deploy with large amounts on first attempt
- Hardcode private keys in contract files

---

For more info: https://docs.aave.com/developers/deployed-contracts/base
