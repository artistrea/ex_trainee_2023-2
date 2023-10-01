import type { Prisma, CategoryItem } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css";

type Props = {
  item: Prisma.CategoryItemCreateInput | CategoryItem;
  setItem: Dispatch<
    SetStateAction<Prisma.CategoryItemCreateInput | CategoryItem>
  >;
  onSubmit: () => void;
  submitText: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

export function ItemForm({
  item,
  setItem,
  onSubmit,
  submitText,
  disabled,
  children,
}: Props) {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
      <fieldset style={{ display: "contents" }} disabled={disabled}>
        <label htmlFor="slug">Slug do iteme</label>
        <input
          id="slug"
          value={item.slug}
          onChange={(e) => setItem((r) => ({ ...r, slug: e.target.value }))}
        />
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          value={item.name}
          onChange={(e) => setItem((r) => ({ ...r, name: e.target.value }))}
        />
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={item.description}
          onChange={(e) =>
            setItem((r) => ({
              ...r,
              description: e.target.value,
            }))
          }
        />
        <button className="btn">{submitText}</button>
      </fieldset>
    </form>
  );
}
