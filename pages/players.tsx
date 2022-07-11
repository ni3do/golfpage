import { Grid } from "@mantine/core";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { PlayerCard } from "../components/cards/PlayerCard";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { setupMaps } from "../store/maps";
import { selectPlayers, setupPlayers } from "../store/players";
import { setupSets } from "../store/sets";
import { selectSettings, setupSettings } from "../store/settings";
import { store } from "../store/store";
import { MapSchema } from "../types/schema";

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
  maps: MapSchema[];
};

export default function IndexPage({ maps }: Props) {
  store.dispatch(setupMaps());
  store.dispatch(setupPlayers());
  store.dispatch(setupSets());
  store.dispatch(setupSettings());

  const [players, setPlayers] = useState(selectPlayers(store.getState()));
  const [settings, setSettings] = useState(selectSettings(store.getState()));

  useEffect(() => {
    store.dispatch(setupPlayers());
    store.dispatch(setupSettings());
    const storeUnsubscribe = store.subscribe(() => {
      setPlayers(selectPlayers(store.getState()));
    });

    return () => {
      storeUnsubscribe();
    };
  }, []);

  return (
    <Layout pageTitle="Players">
      <Grid gutter={"md"} justify={"flex-start"}>
        {players
          .filter((player) => player.setPoints !== undefined)
          .map((player) => (
            <Grid.Col span={4}>
              <PlayerCard key={player.id} player={player} />
            </Grid.Col>
          ))}
      </Grid>
    </Layout>
  );
}
