import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cryptocurrencies",
  description:
    "Simple app for viewing information about and comparing cryptocurrencies",
};

const RootLayout = (props: Readonly<RootLayoutProps>) => (
  <html lang="en">
    <body className={inter.className}>{props.children}</body>
  </html>
);

export default RootLayout;
