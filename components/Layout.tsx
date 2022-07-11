import {
  AppShell,
  Grid,
  Group,
  MantineProvider,
  Navbar,
  Space,
} from "@mantine/core";
import Head from "next/head";

import { ReactNode, useEffect, useState } from "react";
import { selectSettings } from "../store/settings";
import { store } from "../store/store";
import { Brand } from "./Brand";
import { MainLinks } from "./MainLinks";
import { MapModal } from "./modal/MapModal";
import { PlayerModal } from "./modal/PlayerModal";
import { SetModal } from "./modal/SetModal";
import { PageTitle } from "./PageTitle";

type Props = {
  children: ReactNode;
  title?: string;
  pageTitle: string;
};

export default function Layout({
  children,
  title = "GB Stats",
  pageTitle,
}: Props) {
  const [settings, setSettings] = useState(selectSettings(store.getState()));

  useEffect(() => {
    const storeUnsubscribe = store.subscribe(() => {
      setSettings(selectSettings(store.getState()));
    });

    return () => {
      storeUnsubscribe();
    };
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: settings.darkMode ? "dark" : "light",
        }}
      >
        <AppShell
          padding="xs"
          navbar={
            <Navbar p="xs" width={{ base: 300 }}>
              <Navbar.Section mt="xs">
                <Brand />
              </Navbar.Section>
              <Navbar.Section grow mt="md">
                <MainLinks />
              </Navbar.Section>
            </Navbar>
          }
        >
          <Space h="lg" />
          <Space h="sm" />
          <Grid justify="space-between">
            <Grid.Col span={5}>
              <PageTitle title={pageTitle} />
            </Grid.Col>
            <Grid.Col span={4}>
              <Group>
                <SetModal />
                <PlayerModal />
                <MapModal />
              </Group>
            </Grid.Col>
          </Grid>
          <Space h="lg" />
          {children}
        </AppShell>
      </MantineProvider>
    </div>
  );
}
