import styles from "@/styles/Admin.module.css";
import { useRestaurants } from "@/clientApi/restaurants/useRestaurants";
import GoBack from "@/components/GoBack";
import Link from "next/link";
import { ArrowRightSquare } from "lucide-react";
import { useState } from "react";
import type { Restaurant } from "@prisma/client";

export { getServerSideProps } from "..";

function EnterRestaurantInput({ restaurants }: { restaurants: Restaurant[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", marginBlock: "2rem" }}>
      <input
        placeholder="Entre em um restaurante..."
        style={{
          background: "var(--clr-secondary)",
          maxWidth: "20rem",
        }}
        name="restaurantName"
        id="restaurantName"
        list="restaurants"
        onChange={(e) => {
          setSelectedSlug(
            restaurants.find((r) => r.name === e.target.value)?.slug ?? null
          );
        }}
      />
      <Link
        href={{
          pathname: "/admin/[restaurantSlug]",
          query: { restaurantSlug: selectedSlug },
        }}
        style={{
          padding: "0rem 1rem",
          display: "flex",
          alignItems: "center",
          background: "var(--clr-secondary)",
          boxShadow: "-2px 0 2px 0px rgba(0,0,0,0.2)",
          zIndex: 100,
        }}
      >
        <ArrowRightSquare />
      </Link>
      <datalist style={{ display: "none" }} id="restaurants">
        {restaurants.map((r) => (
          <option key={r.id} value={r.name} />
        ))}
      </datalist>
    </div>
  );
}
export default function SuperAdminRestaurants() {
  const { data: restaurants } = useRestaurants((err) => {
    alert(err);
  });

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <GoBack style={{ margin: "1rem 0" }} />
        <h1 className={styles.h1}>Nossos clientes são:</h1>
        <EnterRestaurantInput restaurants={restaurants} />
        <ul>
          {restaurants.map((r) => {
            return (
              <li key={r.slug}>
                <details className={styles.details}>
                  <summary style={{ position: "relative" }}>
                    {r.name} - {r.slug}
                    <Link
                      href={{
                        pathname: "/admin/[restaurantSlug]",
                        query: { restaurantSlug: r.slug },
                      }}
                      style={{
                        color: "var(--clr-primary)",
                        background: "var(--clr-secondary)",
                        padding: "0rem 1rem",
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        boxShadow: "-2px 0 2px 0px rgba(0,0,0,0.2)",
                        marginLeft: "auto",
                      }}
                    >
                      <ArrowRightSquare />
                    </Link>
                  </summary>
                  <div>
                    <p>{r.description}</p>
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
        <Link className={styles.center} href="/super_admin/restaurants/create">
          <button className="btn btn-primary">Adicione um restaurante</button>
        </Link>
      </section>
    </main>
  );
}
