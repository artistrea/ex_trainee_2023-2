import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, signIn } from "next-auth/react";
import { NavBar } from "@/components/NavBar";
import { Poppins } from "next/font/google";
import Head from "next/head";

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
      <Head>
        <title>{"Cardápio {Struct}"}</title>
        <meta
          name="description"
          content="Monte seu cardápio. Estruture-o da sua maneira, escolha a sua paleta de cores, etc; e o melhor: a construção do cardápio está em suas mãos! Não importa se é para um café, bar ou restaurante. Nós da Struct oferecemos um cardápio personalizado por você. Assista nossa demonstração e veja como é fácil!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={poppins.className} style={{ display: "contents" }}>
        <NavBar />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
