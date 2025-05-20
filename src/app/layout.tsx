import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tokenomics Academy",
  description: "A learning platform for crypto-economic design with interactive simulations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
