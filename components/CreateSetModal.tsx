import {
  Button,
  Group,
  Modal,
  NumberInput,
  Space,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React, { useState } from "react";
import { PlayerSchema, SetPointsSchema, SetSchema } from "../types/schema";

type Props = {
  set?: SetSchema;
};

export function CreateSetModal({ set }: Props) {
  const theme = useMantineTheme();
  const edit = set !== undefined;

  const [opened, setOpened] = useState(false);
  const [player0, setPlayer0] = useState("");
  const [player1, setPlayer1] = useState("");
  const [points0, setPoints0] = useState(0);
  const [points1, setPoints1] = useState(0);
  const [winner, setWinner] = useState("");

  const form = useForm({
    initialValues: {
      id: set?.id ?? "",
      map: set?.map ?? "",
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
      formValues.points = [
        {
          id: "",
          setId: -1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          Set: {} as SetSchema,
          player: {
            id: "",
            name: player0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            Set: [] as SetSchema[],
            SetPoints: [] as SetPointsSchema[],
          },
          points: points0,
        },
        {
          id: "",
          setId: -1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          Set: {} as SetSchema,
          player: {
            id: "",
            name: player1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            Set: [] as SetSchema[],
            SetPoints: [] as SetPointsSchema[],
          },
          points: points1,
        },
      ];
      formValues.winner = {
        id: "",
        name: points0 > points1 ? player0 : player1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        Set: [] as SetSchema[],
        SetPoints: [] as SetPointsSchema[],
      };
      console.log(`CreateModal: ${JSON.stringify(formValues, null, 2)}`);
      const body = formValues;
      await fetch("/api/post", {
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
          placeholder="LiLa Land"
          label="Map"
          required
          {...form.getInputProps("map")}
        />
        <Space h="sm" />
        <TextInput
          placeholder="cryptobroether"
          label="Player 0 Name"
          required
          onChange={(e) => setPlayer0(e.target.value)}
        />
        <NumberInput
          placeholder="3"
          label="Points player0"
          required
          onChange={(e) => setPoints0(Number(e))}
        />
        <TextInput
          placeholder="grker"
          label="Player 1 Name"
          required
          onChange={(e) => setPlayer1(e.target.value)}
        />
        <NumberInput
          placeholder="0"
          label="Points player1"
          required
          onChange={(e) => setPoints1(Number(e))}
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
      <Group position="right">
        <Button onClick={() => setOpened(!opened)}>Add Set</Button>
      </Group>
    </>
  );
}
