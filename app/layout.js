import './globals.css';

export const metadata = {
  title: 'Base Alchemy Bot',
  description: 'Base gas monitor and arbitrage dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
