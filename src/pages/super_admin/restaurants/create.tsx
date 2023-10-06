export { getServerSideProps } from "..";
import styles from "@/styles/Admin.module.css";
import GoBack from "@/components/GoBack";
import { RestaurantForm } from "@/components/RestaurantForm";
import { useState } from "react";
import { type Prisma } from "@prisma/client";
import { createRestaurant } from "@/clientApi/restaurants/createRestaurant";
import { useRouter } from "next/router";

function CreateRestaurantPage() {
  const [restaurant, setRestaurant] = useState<Prisma.RestaurantCreateInput>({
    name: "",
    slug: "",
    description: "",
  });

  const router = useRouter();

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <GoBack style={{ margin: "1rem 0" }} />
        <h1 className={styles.h1}>Crie um restaurante:</h1>
        <RestaurantForm
          onSubmit={() => {
            createRestaurant(restaurant)
              .then(() => {
                alert("Restaurante criado com sucesso!");
                router.push("/super_admin/restaurants");
              })
              .catch((err) => {
                alert(err);
              });
          }}
          restaurant={restaurant}
          setRestaurant={setRestaurant}
          submitText="Criar"
        />
      </section>
    </main>
  );
}

export default CreateRestaurantPage;
