import { RoutesOutput } from "@/clientApi/routeOutputs";
import styles from "./styles.module.css";
import { CategoryItem, MenuCategory } from "@prisma/client";
import Link from "next/link";
import GoBack from "../GoBack";
import { useState } from "react";
import CategoryItemDialog from "../CategoryItemDialog";
import { Edit3 } from "lucide-react";
import CategoryDialog from "../CategoryDialog";
import { updateCategory } from "@/clientApi/categories/updateCategory";
import { deleteCategory } from "@/clientApi/categories/deleteCategory";

type RestaurantMenuProps = {
  editable?: boolean;
  restaurant?: RoutesOutput["restaurants"]["slug"]["GET"];
  forceRerender?: () => void;
};

export function RestaurantMenu({
  restaurant,
  editable,
  forceRerender,
}: RestaurantMenuProps) {
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
                <CategoryTitle
                  forceRerender={forceRerender}
                  editable={editable}
                  category={category}
                />
                <p>{category.description}</p>
                <br />
                <br />
                {category.items.map((item) => (
                  <>
                    <div className={styles.separator} />
                    <li className={styles.item}>
                      <Item
                        forceRerender={forceRerender}
                        editable={editable}
                        item={item}
                      />
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

function CategoryTitle({
  category,
  editable,
  forceRerender,
}: {
  category: MenuCategory;
  editable?: boolean;
  forceRerender?: () => void;
}) {
  const [categoryForm, setCategoryForm] = useState(category);
  const [open, setOpen] = useState(false);

  return editable ? (
    <div style={{ display: "contents", position: "relative" }}>
      <CategoryDialog
        open={open}
        setOpen={setOpen}
        title={`Edite a categoria ${category.title}.`}
        description="Edite o prato e clique em 'salvar' quando terminar"
        category={categoryForm}
        setCategory={setCategoryForm as any}
        submitText="Salvar"
        onSubmit={() => {
          updateCategory(categoryForm)
            .then(() => {
              alert("Atualizado com sucesso!");
              forceRerender && forceRerender();
              setOpen(false);
            })
            .catch((err) => {
              if (err.response?.data?.error) alert(err.response.data.error);
              else alert("Erro ao atualizar...");
            });
        }}
        onDelete={() => {
          if (
            window.confirm(
              `Essa ação também irá deletar todos os pratos da categoria! Tem certeza que deseja deletar a categoria ${category.title}?`
            )
          ) {
            deleteCategory(category.id)
              .then(() => {
                alert("Deletado com sucesso!");
                forceRerender && forceRerender();
              })
              .catch((err) => {
                if (err.response?.data?.error) alert(err.response.data.error);
                else alert("Erro ao deletar...");
              });
          }
        }}
      >
        <button className={styles.editIcon} style={{ marginTop: "2.4rem" }}>
          <Edit3 />
        </button>
      </CategoryDialog>

      <CategoryTitle category={category} />
    </div>
  ) : (
    <>
      <h3 id={category.title} className={styles[category.titleClassName]}>
        {category.title}
      </h3>
    </>
  );
}

function Item({
  item,
  editable,
}: {
  item: CategoryItem;
  editable?: boolean;
  forceRerender?: () => void;
}) {
  const [itemForm, setItemForm] = useState(item);

  return editable ? (
    <>
      <CategoryItemDialog
        title="Edite o prato."
        description="Edite o prato e clique em 'salvar' quando terminar"
        item={itemForm}
        setItem={setItemForm as any}
        submitText="Salvar"
        onSubmit={() => {
          alert("TODO");
        }}
        onDelete={() => {
          alert("TODO");
        }}
      >
        <button className={styles.editIcon}>
          <Edit3 />
        </button>
      </CategoryItemDialog>

      <Item item={item} />
    </>
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
