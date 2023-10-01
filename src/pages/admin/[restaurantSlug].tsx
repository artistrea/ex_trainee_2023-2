import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useState } from "react";
import styles from "@/styles/Admin.module.css";
import { useSession } from "next-auth/react";
import { RestaurantForm } from "@/components/RestaurantForm";
import { Restaurant } from "@prisma/client";
import { EditIcon } from "lucide-react";
import Link from "next/link";
import { updateRestaurant } from "@/clientApi/updateRestaurant";
import { AxiosError } from "axios";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const restaurantSlug = ctx.params?.restaurantSlug;

  if (typeof restaurantSlug !== "string")
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const restaurant = await prisma.restaurant
    .findUnique({
      where: { slug: restaurantSlug },
      include: {
        canLogIn: {
          select: {
            email: true,
          },
        },
      },
    })
    .catch(() => null);

  if (!restaurant) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (
    session.user.role === "super_admin" ||
    restaurant.canLogIn.some(({ email }) => email === session.user.email)
  )
    return {
      props: {
        session,
        restaurant,
      },
    };

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default function AdminRestaurant({
  restaurant: initialRestaurant,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [editing, setEditing] = useState(false);
  const { data: session } = useSession();
  const [lastSavedrestaurant, setLastSavedRestaurant] =
    useState<Restaurant>(initialRestaurant);
  const [restaurant, setRestaurant] = useState<Restaurant>(initialRestaurant);

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <span>Bem vindo, {session?.user.name}</span>
        <h1 className={styles.h1}> {restaurant.name}</h1>

        <nav>
          <ul>
            <li>
              <Link
                href={{
                  pathname: "/admin/[restaurantSlug]/menu",
                  query: { restaurantSlug: restaurant.slug },
                }}
              >
                Editar o cardápio
              </Link>
            </li>
          </ul>
        </nav>

        <RestaurantForm
          disabled={!editing}
          restaurant={restaurant}
          setRestaurant={setRestaurant as any}
          onSubmit={() => {
            setEditing(false);
            updateRestaurant(restaurant)
              .then(({ data }) => {
                setRestaurant(data);
                setLastSavedRestaurant(data);
              })
              .catch((err) => {
                if (err instanceof AxiosError)
                  alert(err.response?.data?.error ?? err.message);
                else if (err instanceof Error) alert(err.message);
                else alert("Ocorreu um erro inesperado");
                setRestaurant(lastSavedrestaurant);
              });
          }}
          submitText="Salvar"
        >
          <button
            type="button"
            style={{ display: "contents" }}
            onClick={() => setEditing((pe) => !pe)}
          >
            <span
              style={{
                width: "max-content",
                padding: "0.5rem 1rem",
              }}
            >
              <EditIcon /> Habilitar Edição
            </span>
          </button>
        </RestaurantForm>
      </section>
    </main>
  );
}
