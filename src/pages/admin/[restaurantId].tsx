import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const restaurantId = Number(ctx.params?.restaurantId);

  if (isNaN(restaurantId))
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
      where: { id: restaurantId },
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

export default function AdminRestaurant() {
  return <>Opa</>;
}
