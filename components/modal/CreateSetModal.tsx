import {
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Space,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React, { useState } from "react";
import {
  MapSchema,
  PlayerSchema,
  SetPointsSchema,
  SetSchema,
} from "../../types/schema";

type Props = {
  set?: SetSchema;
  maps?: MapSchema[];
};

export function CreateSetModal({ set, maps }: Props) {
  const theme = useMantineTheme();
  const edit = set !== undefined;

  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      id: set?.id ?? "",
      player0: set?.points[0]?.player.name ?? "cryptobroether",
      player1: set?.points[1]?.player.name ?? "grker",
      points0: set?.points[0]?.points ?? 0,
      points1: set?.points[1]?.points ?? 0,
      mapName: set?.map.name ?? "",
      points: set?.points ?? ([] as SetPointsSchema[]),
      winner: set?.winner ?? ({} as PlayerSchema),
      createdAt: set?.createdAt ?? new Date().toISOString(),
      updatedAt: set?.updatedAt ?? new Date().toISOString(),
    },
  });

  const resetState = () => {
    if (set === undefined) {
      form.reset();
    }
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const formValues = form.values;
      let body = {
        id: formValues.id,
        map: { name: formValues.mapName },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        points: [],
        winner: {},
      };

      body.points = [
        {
          id: "",
          setId: -1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          Set: {} as SetSchema,
          player: {
            id: "",
            name: formValues.player0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            Set: [] as SetSchema[],
            SetPoints: [] as SetPointsSchema[],
          },
          points: formValues.points0,
        },
        {
          id: "",
          setId: -1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          Set: {} as SetSchema,
          player: {
            id: "",
            name: formValues.player1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            Set: [] as SetSchema[],
            SetPoints: [] as SetPointsSchema[],
          },
          points: formValues.points1,
        },
      ];
      formValues.winner = {
        id: "",
        name:
          formValues.points0 > formValues.points1
            ? formValues.player0
            : formValues.player1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        Set: [] as SetSchema[],
        SetPoints: [] as SetPointsSchema[],
      };
      console.log(`CreateModal: ${JSON.stringify(formValues, null, 2)}`);
      await fetch("/api/createSet", {
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
        <Select
          label="Your favorite framework/library"
          placeholder="Pick one"
          searchable
          nothingFound="No options"
          data={maps.map((map) => ({
            label: map.name,
            value: map.name,
          }))}
          {...form.getInputProps("mapName")}
        />
        <Space h="sm" />
        <TextInput
          placeholder="cryptobroether"
          label="Player 0 Name"
          required
          {...form.getInputProps("player0")}
        />
        <NumberInput
          placeholder="3"
          label="Points player0"
          required
          {...form.getInputProps("points0")}
        />
        <TextInput
          placeholder="grker"
          label="Player 1 Name"
          required
          {...form.getInputProps("player1")}
        />
        <NumberInput
          placeholder="0"
          label="Points player1"
          required
          {...form.getInputProps("points1")}
        />
        <Text>{JSON.stringify(form.values, null, 2)}</Text>
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
        Add Set
      </Button>
    </>
  );
}
