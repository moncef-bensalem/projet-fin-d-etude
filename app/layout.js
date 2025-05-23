'use client';

import './globals.css';
import { Inter } from "next/font/google";
import Providers from '../context/Providers';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <title>Penventory - Gestion de stock</title>
        <meta name="description" content="Application de gestion de stock" />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}