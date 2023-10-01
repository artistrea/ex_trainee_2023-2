import { RoutesOutput } from "@/clientApi/routeOutputs";
import styles from "./styles.module.css";
import { CategoryItem, MenuCategory } from "@prisma/client";

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
            <h3 className={styles[category.titleClassName]}>
              {category.title}
            </h3>
            <ul>
              {category.items.map((item) => (
                <li className={`${styles.item} ${styles[item.className]}`}>
                  <Item item={item} />
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

function Item({ item }: { item: CategoryItem }) {
  return (
    <>
      <h4>{item.name}</h4>
      <p>
        {(item.priceInCents / 100).toLocaleString("pt-BR", {
          currency: "BRL",
          style: "currency",
        })}
      </p>
      <p>{item.description}</p>
    </>
  );
}

function Category({ category }: { category: MenuCategory }) {}
