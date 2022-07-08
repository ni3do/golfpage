import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Leaderboard from "../components/Leaderboard";
import prisma from "../lib/prisma";
import { SetSchema } from "../types/schema";

export const getStaticProps: GetStaticProps = async () => {
  const sets = await prisma.set.findMany({
    include: {
      points: { include: { player: true } },
      winner: true,
    },
  });

  return { props: { sets: JSON.parse(JSON.stringify(sets)) } };
};

type Props = {
  sets: SetSchema[];
};

export default function IndexPage({ sets }: Props) {
  return (
    <Layout pageTitle="Leaderboard">
      <Leaderboard sets={sets} />
    </Layout>
  );
}
