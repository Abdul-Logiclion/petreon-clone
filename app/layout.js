'use client'

import { Inter } from "next/font/google";
import Head from 'next/head';  // Import Head from Next.js for managing document head
import "./globals.css";
import { SessionProvider } from 'next-auth/react';

import NavBar from "./components/Navbar";
import Footer from "./components/Foooter";
const inter = Inter({ subsets: ["latin"] });

 const metadata = {
  title: "Get me a chai",
  description: "a creator funding app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />  {/* Set the favicon to patreon.png */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Additional meta tags or other head elements can be added here */}
      </Head>

      <body className={inter.className}>
      <SessionProvider>
 
      <NavBar/>
        {children}

        </SessionProvider>
      </body>
    </html>
  );
}
