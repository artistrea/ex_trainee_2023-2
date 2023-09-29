import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, signIn } from "next-auth/react";
import { NavBar } from "@/components/NavBar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className={poppins.className} style={{ display: "contents" }}>
        <NavBar />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
