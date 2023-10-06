import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Link from "next/link";
import { useRestaurants } from "@/clientApi/restaurants/useRestaurants";
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
        </ul>
      </nav>
    </main>
  );
}
