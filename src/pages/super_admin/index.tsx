import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Link from "next/link";
import { useRestaurants } from "@/clientApi/useRestaurants";
import styles from "@/styles/Admin.module.css";
import { ArrowRightSquare } from "lucide-react";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) return { redirect: { destination: "/", permanent: false } };

  if (session.user.role !== "super_admin")
    return {
      redirect: { destination: "/dashboard", permanent: false },
    };

  return { props: { session } };
};

function EnterRestaurantInput() {
  const { data: restaurants } = useRestaurants((err) => {
    alert(err);
  });

  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <>
      <label style={{ display: "flex" }} htmlFor="restaurantName">
        Entre no Restaurante:
        <Link
          href={{
            pathname: "/admin/[restaurantId]",
            query: { restaurantId: selectedId },
          }}
          style={{
            marginLeft: "auto",
            pointerEvents: selectedId ? "initial" : "none",
            color: selectedId ? "var(--clr-primary)" : "initial",
          }}
          aria-disabled={!selectedId}
        >
          <ArrowRightSquare />
        </Link>
      </label>
      <input
        placeholder="Nome do Restaurante"
        style={{
          background: "var(--clr-accent)",
          color: "var(--clr-background)",
        }}
        name="restaurantName"
        id="restaurantName"
        list="restaurants"
        onChange={(e) => {
          setSelectedId(
            restaurants.find((r) => r.name === e.target.value)?.id ?? null
          );
        }}
      />
      <datalist style={{ display: "none" }} id="restaurants">
        {restaurants.map((r) => (
          <option key={r.id} value={r.name} />
        ))}
      </datalist>
    </>
  );
}

export default function SuperAdminPage() {
  return (
    <main className={styles.navMain}>
      <nav>
        <ul>
          <li>
            <Link href="/super_admin/contacts">Contatos Feitos</Link>
          </li>
          <li>
            <Link href="/super_admin/restaurants">Restaurantes Clientes</Link>
          </li>
          <li>
            <EnterRestaurantInput />
          </li>
        </ul>
      </nav>
    </main>
  );
}
