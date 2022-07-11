import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Sets from "../components/SetPage";
import prisma from "../lib/prisma";
import { MapSchema, SetSchema } from "../types/schema";

export const getServerSideProps: GetServerSideProps = async () => {
  const sets = await prisma.set.findMany({
    include: {
      points: { include: { player: true } },
      winner: true,
    },
  });

  const maps = await prisma.map.findMany({});

  return {
    props: {
      sets: JSON.parse(JSON.stringify(sets)),
      maps: JSON.parse(JSON.stringify(maps)),
    },
  };
};

type Props = {
  sets: SetSchema[];
  maps: MapSchema[];
};

export default function IndexPage({ sets, maps }: Props) {
  return (
    <Layout pageTitle="Sets" maps={maps}>
      <Sets sets={sets} maps={maps} />
    </Layout>
  );
}
