import type { Restaurant, Prisma } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import styles from "@/styles/Forms.module.css";

type Props = {
  restaurant: Prisma.RestaurantCreateInput | Restaurant;
  setRestaurant: Dispatch<
    SetStateAction<Prisma.RestaurantCreateInput | Restaurant>
  >;
  onSubmit: () => void;
  submitText: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

export function RestaurantForm({
  restaurant,
  setRestaurant,
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
        <label htmlFor="slug">Slug do restaurante</label>
        <input
          id="slug"
          value={restaurant.slug}
          onChange={(e) =>
            setRestaurant((r) => ({ ...r, slug: e.target.value }))
          }
        />
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          value={restaurant.name}
          onChange={(e) =>
            setRestaurant((r) => ({ ...r, name: e.target.value }))
          }
        />
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={restaurant.description}
          onChange={(e) =>
            setRestaurant((r) => ({
              ...r,
              description: e.target.value,
            }))
          }
        />
        <button className="btn btn-primary">{submitText}</button>
      </fieldset>
    </form>
  );
}
