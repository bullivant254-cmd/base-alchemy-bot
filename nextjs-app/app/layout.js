import "./globals.css";

export const metadata = {
  title: "Base Alchemy Bot Dashboard",
  description: "Base network arbitrage bot dashboard with Alchemy RPC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
