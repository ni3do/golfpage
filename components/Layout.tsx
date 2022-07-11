import {
  AppShell,
  Grid,
  Group,
  MantineProvider,
  Navbar,
  Space,
} from "@mantine/core";
import Head from "next/head";

import { ReactNode } from "react";
import { MapSchema, SetSchema } from "../types/schema";
import { Brand } from "./Brand";
import { MainLinks } from "./MainLinks";
import { CreatePlayerModal } from "./modal/CreatePlayerModal";
import { CreateSetModal } from "./modal/CreateSetModal";
import { PageTitle } from "./PageTitle";

type Props = {
  children: ReactNode;
  title?: string;
  pageTitle: string;
  sets?: SetSchema[];
  maps?: MapSchema[];
};

export default function Layout({
  children,
  title = "GB Stats",
  pageTitle,
  maps,
}: Props) {
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
          colorScheme: "dark",
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
            <Grid.Col span={3}>
              <Group>
                <CreateSetModal maps={maps} />
                <CreatePlayerModal />
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
