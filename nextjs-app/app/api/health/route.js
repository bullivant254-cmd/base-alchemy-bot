export async function GET() {
  return Response.json({
    status: "ok",
    env: {
      ALCHEMY_API_KEY: Boolean(process.env.ALCHEMY_API_KEY),
      BASE_RPC_URL: Boolean(process.env.BASE_RPC_URL),
      SIGNER_PRIVATE_KEY: Boolean(process.env.SIGNER_PRIVATE_KEY),
      NEXT_PUBLIC_SIGNER_ADDRESS: Boolean(process.env.NEXT_PUBLIC_SIGNER_ADDRESS),
      ARBITRAGE_CONTRACT_ADDRESS: Boolean(process.env.ARBITRAGE_CONTRACT_ADDRESS),
      NEXT_PUBLIC_ARBITRAGE_CONTRACT_ADDRESS: Boolean(
        process.env.NEXT_PUBLIC_ARBITRAGE_CONTRACT_ADDRESS
      ),
    },
    timestamp: new Date().toISOString(),
  });
}
