import { RoutesOutput } from "@/clientApi/routeOutputs";
import styles from "./styles.module.css";
import { CategoryItem, MenuPageCategory } from "@prisma/client";
import DialogDemo from "../Dialog";

type RestaurantMenuProps = {
  editable?: boolean;
  restaurant?: RoutesOutput["restaurants"]["slug"]["GET"];
};

export function RestaurantMenu({ restaurant, editable }: RestaurantMenuProps) {
  // alert(JSON.stringify(restaurant));

  if (!restaurant || !restaurant.menuPages) return <>Loading</>;

  const menuPages = restaurant.menuPages;

  return (
    <section className={styles.defaultStyles}>
      <DialogDemo />
      <h2>Cardápio</h2>
      <ul className={styles.menu}>
        {menuPages.map((menuPage) => (
          <li className={`${styles.menuPage} ${styles[menuPage.className]}`}>
            <h3 className={styles[menuPage.titleClassName]}>
              {menuPage.title}
            </h3>
            <ul>
              {menuPage.categories.map((category) => (
                <li className={styles.category}>
                  <h4>{category.title}</h4>
                  <ul>
                    {category.items.map((item) => (
                      <li className={styles.item}>
                        <Item item={item} />
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <pre>{JSON.stringify(menuPages, null, 2)}</pre>
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

function Category({ category }: { category: MenuPageCategory }) {}
