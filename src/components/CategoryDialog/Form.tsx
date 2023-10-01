import type { Prisma, MenuCategory } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import styles from "@/styles/Forms.module.css";

export type CategoryFormProps = {
  category: Prisma.MenuCategoryCreateInput | MenuCategory;
  setCategory: Dispatch<
    SetStateAction<Prisma.MenuCategoryCreateInput | MenuCategory>
  >;
  onSubmit: () => void;
  submitText: string;
  disabled?: boolean;
};

export function CategoryForm({
  category,
  setCategory,
  onSubmit,
  submitText,
  disabled,
}: CategoryFormProps) {
  function handleChange(key: keyof typeof category, value: string) {
    setCategory((r) => ({ ...r, [key]: value }));
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
        <label htmlFor="title">Título da categoria</label>
        <input
          id="title"
          value={category.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <label htmlFor="description">Descrição</label>
        <textarea
          rows={9}
          id="description"
          value={category.description ?? ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <button className="btn btn-warning">{submitText}</button>
      </fieldset>
    </form>
  );
}
