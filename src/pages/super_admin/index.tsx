import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Link from "next/link";

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
    <main style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flex: 1,
          }}
        >
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
