import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Sets from "../components/SetPage";
import prisma from "../lib/prisma";
import { SetSchema } from "../types/schema";

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.set.findMany({
    include: {
      points: { include: { player: true } },
      winner: true,
    },
  });
  const serFeed = JSON.stringify(feed);
  return { props: { serFeed } };
};

export default function IndexPage(props: any) {
  const test = JSON.parse(props.serFeed) as SetSchema[];

  // console.log(test);
  return (
    <Layout pageTitle="Sets">
      <Sets sets={test} />
    </Layout>
  );
}
