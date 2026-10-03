import { ethers } from "hardhat";

async function main() {
  // Base Sepolia Testnet Aave V3 Address Provider
  const AAVE_ADDRESS_PROVIDER_SEPOLIA = "0x012bf85Da3dE553FBe19f6CAbc1E70DBf652A509";
  
  // Base Mainnet Aave V3 Address Provider
  const AAVE_ADDRESS_PROVIDER_MAINNET = "0xe20fCBdBfFC4Dd138cE8b2E6fbB6CB49777ad64D";

  // Determine which network we're deploying to
  const network = await ethers.provider.getNetwork();
  const isMainnet = network.chainId === 8453;
  const addressProvider = isMainnet ? AAVE_ADDRESS_PROVIDER_MAINNET : AAVE_ADDRESS_PROVIDER_SEPOLIA;

  console.log(`Deploying BaseFlashLoan contract to ${isMainnet ? "Base Mainnet" : "Base Sepolia"}...`);
  console.log(`Aave Address Provider: ${addressProvider}`);

  const BaseFlashLoan = await ethers.getContractFactory("BaseFlashLoan");
  const flashLoan = await BaseFlashLoan.deploy(addressProvider);

  await flashLoan.waitForDeployment();

  const address = await flashLoan.getAddress();
  console.log(`✅ BaseFlashLoan deployed to: ${address}`);
  console.log(`🔗 Verify at: https://${isMainnet ? "" : "sepolia."}basescan.org/address/${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
