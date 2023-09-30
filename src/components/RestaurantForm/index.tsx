import { type Prisma } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css";

type Props = {
  restaurant: Prisma.RestaurantCreateInput;
  setRestaurant: Dispatch<SetStateAction<Prisma.RestaurantCreateInput>>;
  onSubmit: () => void;
};

export function RestaurantForm({ restaurant, setRestaurant, onSubmit }: Props) {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="slug">Slug do restaurante</label>
      <input
        id="slug"
        value={restaurant.slug}
        onChange={(e) => setRestaurant((r) => ({ ...r, slug: e.target.value }))}
      />
      <label htmlFor="name">Nome</label>
      <input
        id="name"
        value={restaurant.name}
        onChange={(e) => setRestaurant((r) => ({ ...r, name: e.target.value }))}
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
      <button>Criar</button>
    </form>
  );
}
