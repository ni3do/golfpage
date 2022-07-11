import { ActionIcon, Box, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import { MoonStars } from "tabler-icons-react";
import { editSettings, selectSettings } from "../store/settings";
import { store } from "../store/store";

export function Brand() {
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
    <Box
      sx={(theme) => ({
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
        paddingBottom: theme.spacing.lg,
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      })}
    >
      <Group position="apart">
        <span>Golf Blitz Stats</span>
        <ActionIcon
          variant="default"
          onClick={() =>
            store.dispatch(editSettings({ darkMode: !settings.darkMode }))
          }
          size={30}
        >
          <MoonStars size={16} />
        </ActionIcon>
      </Group>
    </Box>
  );
}
