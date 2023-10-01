import type { Prisma, CategoryItem } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import styles from "@/styles/Forms.module.css";

export type ItemFormProps = {
  item: Prisma.CategoryItemCreateInput | CategoryItem;
  setItem: Dispatch<
    SetStateAction<Prisma.CategoryItemCreateInput | CategoryItem>
  >;
  onSubmit: () => void;
  submitText: string;
  disabled?: boolean;
};

export function ItemForm({
  item,
  setItem,
  onSubmit,
  submitText,
  disabled,
}: ItemFormProps) {
  function handleChange(key: keyof typeof item, value: string) {
    if (key === "priceInCents") {
      setItem((r) => ({ ...r, [key]: Number(value.replace(/\D/g, "")) }));
    } else setItem((r) => ({ ...r, [key]: value }));
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <fieldset style={{ display: "contents" }} disabled={disabled}>
        <label htmlFor="name">Nome do item</label>
        <input
          id="name"
          value={item.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <label htmlFor="priceInCents">Preço</label>
        <input
          id="priceInCents"
          value={(item.priceInCents / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          onChange={(e) => handleChange("priceInCents", e.target.value)}
        />
        <label htmlFor="description">Descrição</label>
        <textarea
          rows={9}
          id="description"
          value={item.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <button className="btn btn-primary">{submitText}</button>
      </fieldset>
    </form>
  );
}
