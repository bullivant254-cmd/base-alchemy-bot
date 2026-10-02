export async function GET() {
  return Response.json({
    ok: true,
    service: 'base-alchemy-bot',
    status: 'running',
    network: 'base',
  });
}
