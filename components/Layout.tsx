import { AppShell, Group, MantineProvider, Navbar, Space } from "@mantine/core";
import Head from "next/head";

import { ReactNode } from "react";
import { Brand } from "./Brand";
import { CreateSetModal } from "./CreateSetModal";
import { MainLinks } from "./MainLinks";
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
          <Group grow={true}>
            <PageTitle title={pageTitle} />
            <CreateSetModal />
          </Group>
          <Space h="lg" />
          {children}
        </AppShell>
      </MantineProvider>
    </div>
  );
}
