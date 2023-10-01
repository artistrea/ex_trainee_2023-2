import { RoutesOutput } from "@/clientApi/routeOutputs";
import styles from "./styles.module.css";
import { CategoryItem } from "@prisma/client";
import Link from "next/link";
import GoBack from "../GoBack";

type RestaurantMenuProps = {
  editable?: boolean;
  restaurant?: RoutesOutput["restaurants"]["slug"]["GET"];
};

export function RestaurantMenu({ restaurant, editable }: RestaurantMenuProps) {
  if (!restaurant || !restaurant.menu) return <>Loading</>;

  const menu = restaurant.menu;

  return (
    <section className={`${styles.defaultStyles}`}>
      <h2 id="cardapio">Cardápio</h2>
      <div className={`${styles.menu}`}>
        <div className={styles.categoriesList}>
          <GoBack
            to="#cardapio"
            text="Voltar para categorias"
            className={styles.backButton}
          />
          {menu.categories.map((category) => (
            <ul className={`${styles[menu.className]} ${styles.category}`}>
              <>
                <h3
                  id={category.title}
                  className={styles[category.titleClassName]}
                >
                  {category.title}
                </h3>
                <p>{category.description}</p>
                <br />
                <br />
                {category.items.map((item) => (
                  <>
                    <div className={styles.separator} />
                    <li className={styles.item}>
                      <Item item={item} />
                    </li>
                  </>
                ))}
              </>
            </ul>
          ))}
        </div>
        <aside className={`${styles.inverted} ${styles.categoriesMenu}`}>
          <ul>
            {menu.categories.map((category) => (
              <li>
                <Link className={styles.link} href={`#${category.title}`}>
                  <h3>{category.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      {/* <pre>{JSON.stringify(menu, null, 2)}</pre> */}
    </section>
  );
}

function Item({ item, editable }: { item: CategoryItem; editable?: boolean }) {
  return editable ? (
    <></>
  ) : (
    <>
      <span
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <h4>{item.name}</h4>
        <p>
          {(item.priceInCents / 100).toLocaleString("pt-BR", {
            currency: "BRL",
            style: "currency",
          })}
        </p>
      </span>
      <p>{item.description}</p>
    </>
  );
}
