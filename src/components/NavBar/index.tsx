import { signIn, signOut, useSession } from "next-auth/react";
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
          <Image height={40} width={40} src="/avatar.png" alt="Logo" />
        </Link>
      </div>

      <div className={styles.navMid}>
        <Link href="/#contact">Sobre</Link>
        <Link href="/#whyUs">Por que nós?</Link>
      </div>
      {session ? (
        <div className={styles.navRight}>
          <Link
            href={`/admin/${session?.user.restaurantSlug}`}
            style={{
              cursor: "pointer",
              padding: "0.5rem 1rem",
              color: "var(--clr-primary)",
              textDecoration: "none",
            }}
            onClick={(e) => {
              e.preventDefault();
              if (!session) signIn("google");
              else router.push("/api/after_auth");
            }}
          >
            Entrar no painel
          </Link>
          <a
            style={{
              cursor: "pointer",
              padding: "0.5rem 1rem",
              color: "var(--clr-primary)",
              textDecoration: "none",
            }}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sair
          </a>
        </div>
      ) : (
        <Link
          href="/api/auth/signin"
          style={{
            cursor: "pointer",
            padding: "0.5rem 1rem",
            color: "var(--clr-primary)",
            textDecoration: "none",
          }}
          onClick={(e) => {
            e.preventDefault();
            signIn("google");
          }}
        >
          Já sou cliente!
        </Link>
      )}
    </nav>
  );
}
