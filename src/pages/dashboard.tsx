import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

export const getServerSideProps = (async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      session,
    },
  };
}) satisfies GetServerSideProps<Session | {}>;

export default function Dashboard() {
  const { data: session } = useSession();

  return <h1>{JSON.stringify(session)}</h1>;
}
