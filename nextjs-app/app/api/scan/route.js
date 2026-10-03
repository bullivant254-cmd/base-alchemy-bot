import { getFlashLoanContract, getNetworkStatus, getSigner, getWalletBalance } from "@/lib/base";

export async function GET() {
  try {
    const signer = getSigner();
    const network = await getNetworkStatus();
    const walletBalance = await getWalletBalance(signer.address);
    const contract = getFlashLoanContract(signer);

    return Response.json({
      status: "ok",
      wallet: signer.address,
      walletBalance,
      network,
      contractAddress: process.env.ARBITRAGE_CONTRACT_ADDRESS,
      contractReady: !!process.env.ARBITRAGE_CONTRACT_ADDRESS,
      contractName: contract?.name ? await contract.name() : "unknown",
    });
  } catch (error) {
    return Response.json(
      {
        status: "error",
        message: error.message || "Base scan failed",
      },
      { status: 500 }
    );
  }
}
