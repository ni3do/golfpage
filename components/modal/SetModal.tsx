import {
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Space,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { selectMaps, setupMaps } from "../../store/maps";
import { selectPlayers, setupPlayers } from "../../store/players";
import { createSet } from "../../store/sets";
import { store } from "../../store/store";
import {
  MapSchema,
  PlayerSchema,
  SetPointsSchema,
  SetSchema,
} from "../../types/schema";

type Props = {
  set?: SetSchema;
};

export function SetModal({ set }: Props) {
  const theme = useMantineTheme();
  const edit = set !== undefined;

  const [maps, setMaps] = useState(selectMaps(store.getState()));
  const [players, setPlayers] = useState(selectPlayers(store.getState()));
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    store.dispatch(setupMaps());
    store.dispatch(setupPlayers());

    const storeUnsubscribe = store.subscribe(() => {
      setPlayers(selectPlayers(store.getState()));
      setMaps(selectMaps(store.getState()));
    });

    return () => {
      storeUnsubscribe();
    };
  }, []);

  const form = useForm({
    initialValues: {
      id: set?.id ?? "",
      player0: set?.points[0]?.player.name ?? "",
      player1: set?.points[1]?.player.name ?? "",
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
        map: { name: formValues.mapName } as MapSchema,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        points: [] as SetPointsSchema[],
        winner: {} as PlayerSchema,
      };

      body.points = [
        {
          id: "",
          setId: -1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          player: {
            id: "",
            name: formValues.player0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            Set: [] as SetSchema[],
            SetPoints: [] as SetPointsSchema[],
          },
          points: formValues.points0,
        } as SetPointsSchema,
        {
          id: "",
          setId: -1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          player: {
            id: "",
            name: formValues.player1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            Set: [] as SetSchema[],
            SetPoints: [] as SetPointsSchema[],
          },
          points: formValues.points1,
        } as SetPointsSchema,
      ] as SetPointsSchema[];
      body.winner = {
        id: "",
        name:
          formValues.points0 > formValues.points1
            ? formValues.player0
            : formValues.player1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        Set: [] as SetSchema[],
        SetPoints: [] as SetPointsSchema[],
      } as PlayerSchema;
      console.log(`CreateModal: ${JSON.stringify(body, null, 2)}`);
      store.dispatch(createSet(body as SetSchema));
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
          label="Map"
          placeholder="Pick one"
          searchable
          data={maps.map((map) => ({
            label: map.name,
            value: map.name,
          }))}
          {...form.getInputProps("mapName")}
        />
        <Space h="sm" />
        <Select
          placeholder="cryptobroether"
          label="Player 0 Name"
          required
          data={players.map((player) => ({
            label: player.name,
            value: player.name,
          }))}
          {...form.getInputProps("player0")}
        />
        <NumberInput
          placeholder="3"
          label="Points player0"
          required
          {...form.getInputProps("points0")}
        />
        <Select
          placeholder="grker"
          label="Player 1 Name"
          required
          data={players.map((player) => ({
            label: player.name,
            value: player.name,
          }))}
          {...form.getInputProps("player1")}
        />
        <NumberInput
          placeholder="0"
          label="Points player1"
          required
          {...form.getInputProps("points1")}
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
        Add Set
      </Button>
    </>
  );
}
