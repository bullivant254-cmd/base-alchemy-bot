import { Contract, ethers, JsonRpcProvider, Wallet } from "ethers";

export function getProvider() {
  return new JsonRpcProvider(process.env.BASE_RPC_URL);
}

export function getSigner() {
  const provider = getProvider();
  return new Wallet(process.env.SIGNER_PRIVATE_KEY, provider);
}

export async function getNetworkStatus() {
  const provider = getProvider();

  const [blockNumber, feeData, network] = await Promise.all([
    provider.getBlockNumber(),
    provider.getFeeData(),
    provider.getNetwork(),
  ]);

  return {
    network: network.name,
    chainId: Number(network.chainId),
    blockNumber,
    gasPrice: feeData.gasPrice ? ethers.formatUnits(feeData.gasPrice, "gwei") : "n/a",
    maxFeePerGas: feeData.maxFeePerGas ? ethers.formatUnits(feeData.maxFeePerGas, "gwei") : "n/a",
  };
}

export async function getWalletBalance(address) {
  const provider = getProvider();
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

export function getFlashLoanContract(signerOrProvider = getSigner()) {
  const abi = [
    "function requestFlashLoan(address asset, uint256 amount) external",
    "function withdrawToken(address token) external",
    "function getBalance(address tokenAddress) external view returns (uint256)",
  ];

  return new Contract(process.env.ARBITRAGE_CONTRACT_ADDRESS, abi, signerOrProvider);
}
