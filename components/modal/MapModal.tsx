import {
  Button,
  Group,
  Modal,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React, { useState } from "react";
import { createMap } from "../../store/maps";
import { store } from "../../store/store";
import { MapSchema } from "../../types/schema";

type Props = {
  map?: MapSchema;
};

export function MapModal({ map }: Props) {
  const theme = useMantineTheme();
  const edit = map !== undefined;

  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      name: map?.name ?? "",
    },
  });

  const resetState = () => {
    if (map === undefined) {
      form.reset();
    }
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const formValues = form.values;
      console.log(`Create Map: ${JSON.stringify(formValues, null, 2)}`);
      store.dispatch(createMap(formValues.name));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        title="Add Map"
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
          label="Map Name"
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
            {edit ? "Update" : "Add"}
          </Button>
        </Group>
      </Modal>
      <Button color={"violet"} onClick={() => setOpened(!opened)}>
        Add Map
      </Button>
    </>
  );
}
