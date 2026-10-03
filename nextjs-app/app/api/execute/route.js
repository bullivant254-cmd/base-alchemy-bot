import { ethers } from "ethers";
import { getFlashLoanContract, getSigner } from "@/lib/base";

export async function POST() {
  try {
    const signer = getSigner();
    const contract = getFlashLoanContract(signer);

    const asset = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
    const amount = ethers.parseUnits("5000", 6);

    const tx = await contract.requestFlashLoan(asset, amount, {
      gasLimit: 450000,
    });

    const receipt = await tx.wait();

    return Response.json({
      status: "success",
      hash: tx.hash,
      blockNumber: receipt.blockNumber,
      message: "Flash-loan request submitted successfully.",
    });
  } catch (error) {
    return Response.json(
      {
        status: "error",
        message: error.message || "Execution failed",
      },
      { status: 500 }
    );
  }
}
