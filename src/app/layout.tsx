import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Providers } from "./GlobalRedux/Provider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oonth k muh mai Jeera Board",
  description: "A clone for jira board from dragging and dropping functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
