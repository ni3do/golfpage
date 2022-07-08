import {
  Button,
  Group,
  Modal,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React, { useState } from "react";
import { PlayerSchema } from "../../types/schema";

type Props = {
  player?: PlayerSchema;
};

export function CreatePlayerModal({ player }: Props) {
  const theme = useMantineTheme();
  const edit = player !== undefined;

  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      name: player?.name ?? "",
    },
  });

  const resetState = () => {
    if (player === undefined) {
      form.reset();
    }
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const formValues = form.values;
      console.log(`Create Player: ${JSON.stringify(formValues, null, 2)}`);
      const body = formValues;
      await fetch("/api/createPlayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        title="Save Set"
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[0]
        }
        overlayOpacity={0.55}
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        centered={true}
        size="55vw"
      >
        <TextInput
          placeholder="Nina Name"
          label="Player Name"
          required
          {...form.getInputProps("name")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              submitData(e);
              setOpened(false);
            }}
          >
            {edit ? "Update" : "Create"}
          </Button>
        </Group>
      </Modal>
      <Button color={"violet"} onClick={() => setOpened(!opened)}>
        Add Player
      </Button>
    </>
  );
}
