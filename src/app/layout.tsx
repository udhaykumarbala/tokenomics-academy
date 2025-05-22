import type { Metadata } from "next";
import "./globals.css";
import "./styles/glossary.css";
import { MDXComponentsProvider } from "@/components/mdx";

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
        <MDXComponentsProvider>
          {children}
        </MDXComponentsProvider>
      </body>
    </html>
  );
}
