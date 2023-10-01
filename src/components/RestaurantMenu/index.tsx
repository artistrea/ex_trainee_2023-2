import { RoutesOutput } from "@/clientApi/routeOutputs";
import styles from "./styles.module.css";

type RestaurantMenuProps = {
  editable?: boolean;
  restaurant?: RoutesOutput["restaurants"]["slug"]["GET"];
};

export function RestaurantMenu({ restaurant, editable }: RestaurantMenuProps) {
  // alert(JSON.stringify(restaurant));

  if (!restaurant || !restaurant.menu) return <>Loading</>;

  const menu = restaurant.menu;
  const categories = menu.categories;

  return (
    <section className={styles.defaultStyles}>
      <h2>Cardápio</h2>
      <ul className={styles.menu}>
        {categories.map((category) => (
          <li className={styles.category}>
            <h3>{category.title}</h3>
            <ul>
              {category.items.map((item) => (
                <li className={`${styles.item} ${styles[item.className]}`}>
                  <h4>{item.name}</h4>
                  <p>
                    {(item.priceInCents / 100).toLocaleString("pt-BR", {
                      currency: "BRL",
                      style: "currency",
                    })}
                  </p>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <pre>{JSON.stringify(categories, null, 2)}</pre>
    </section>
  );
}
