require("dotenv").config();

const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);
const signer = process.env.SIGNER_PRIVATE_KEY
  ? new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider)
  : null;

const ARBITRAGE_CONTRACT = process.env.ARBITRAGE_CONTRACT_ADDRESS;

async function checkBaseConnection() {
  const blockNumber = await provider.getBlockNumber();
  console.log(`Connected to Base. Current block: ${blockNumber}`);

  if (signer) {
    console.log(`Wallet address: ${signer.address}`);
  }

  if (!ARBITRAGE_CONTRACT) {
    console.warn("ARBITRAGE_CONTRACT_ADDRESS is missing. Set it before running the bot.");
  }
}

async function main() {
  try {
    await checkBaseConnection();

    const contractAbi = [
      "function requestFlashLoan(address asset, uint256 amount) external",
      "function withdrawToken(address token) external",
    ];

    if (ARBITRAGE_CONTRACT) {
      const contract = new ethers.Contract(ARBITRAGE_CONTRACT, contractAbi, signer || provider);
      console.log(`Loaded arbitrage contract: ${contract.target || ARBITRAGE_CONTRACT}`);
    }

    console.log("Base bot setup complete. Awaiting task execution.");
  } catch (error) {
    console.error("Bot initialization failed:", error.message || error);
    process.exit(1);
  }
}

main();
