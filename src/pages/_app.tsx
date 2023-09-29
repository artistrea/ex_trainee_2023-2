import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, signIn } from "next-auth/react";

function NavBar() {
  return (
    <a
      style={{ cursor: "pointer" }}
      onClick={(e) => {
        e.preventDefault();
        signIn("google");
      }}
    >
      Entre na plataforma
    </a>
  );
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <NavBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
