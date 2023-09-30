export { getServerSideProps } from "./";

import styles from "@/styles/Admin.module.css";
import { useContacts } from "@/clientApi/useContacts";
import GoBack from "@/components/GoBack";

export default function ContactsPage() {
  const { contacts } = useContacts((err) => {
    alert(err);
  });

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <GoBack style={{ margin: "1rem 0" }} />
        <h1 className={styles.h1}>Entraram em Contato:</h1>
        <ul>
          {contacts.map((c) => {
            return (
              <li key={c.id}>
                <details className={styles.details}>
                  <summary>
                    {c.name} - {c.email} - {c.phone}
                  </summary>
                  <div>
                    <p>{c.message}</p>
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
