import styles from "@/styles/Admin.module.css";
import { useRestaurants } from "@/clientApi/useRestaurants";
import GoBack from "@/components/GoBack";
import Link from "next/link";

export { getServerSideProps } from "..";

export default function SuperAdminRestaurants() {
  const { data: restaurants } = useRestaurants((err) => {
    alert(err);
  });

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <GoBack style={{ margin: "1rem 0" }} />
        <h1 className={styles.h1}>Nossos clientes são:</h1>
        <ul>
          {restaurants.map((r) => {
            return (
              <li key={r.slug}>
                <details className={styles.details}>
                  <summary>
                    {r.name} - {r.slug}
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
          <button>Adicione um restaurante</button>
        </Link>
      </section>
    </main>
  );
}
