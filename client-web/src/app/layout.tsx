import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import MainNavigation from "./_components/navigation";
import GlobalFooter from "./_components/GlobalFooter";

export const metadata: Metadata = {
  title: "Unicus General Contracting",
  description: "Unique Construction for you Commercial or Home Needs",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <div>
          <MainNavigation />
        </div>
        <main>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </main>
        {/* <GlobalFooter /> */}
      </body>
    </html>
  );
}
