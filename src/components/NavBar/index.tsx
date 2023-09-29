import { signIn, useSession } from "next-auth/react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export function NavBar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <div>
        <Link href="/">
          <Image height={40} width={100} src="/next.svg" alt="Logo" />
        </Link>
      </div>

      <div className={styles.navMid}>
        <Link href="/#contact">Sobre</Link>
        <Link href="/#whyUs">Por que nós?</Link>
      </div>
      <a
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          e.preventDefault();
          if (!session) signIn("google");
          else router.push("/api/after_auth");
        }}
      >
        {!session ? "Já sou cliente!" : "Ver dashboard"}
      </a>
    </nav>
  );
}
