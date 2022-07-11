import { Badge, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { selectMaps, setupMaps } from "../store/maps";
import { selectPlayers, setupPlayers } from "../store/players";
import { selectSets, setupSets } from "../store/sets";
import { store } from "../store/store";
import { SetPointsSchema, SetSchema } from "../types/schema";

type Props = {};

export default function Sets({}: Props) {
  const [players, setPlayers] = useState(selectPlayers(store.getState()));
  const [maps, setMaps] = useState(selectMaps(store.getState()));
  const [sets, setSets] = useState(selectSets(store.getState()));
  const [rows, setRows] = useState<any[]>([
    { test: "name" },
    { test: "name2" },
  ]);
  useEffect(() => {
    store.dispatch(setupMaps());
    store.dispatch(setupPlayers());
    store.dispatch(setupSets());

    const storeUnsubscribe = store.subscribe(() => {
      setMaps(selectMaps(store.getState()));
      setPlayers(selectPlayers(store.getState()));
      setSets(selectSets(store.getState()));
    });

    const reevaluateRows = () => {
      setRows(
        sets.map((set: SetSchema) => {
          return (
            <tr key={set.id}>
              <td>{set.id}</td>
              <td>
                <Badge color="violet">{set.map.name}</Badge>
              </td>
              <td>
                {set.points.map((sp: SetPointsSchema) => {
                  return <Badge color="violet">{sp.playerName}</Badge>;
                })}
              </td>
              <td>
                <Badge color="violet">{set.winner.name}</Badge>
              </td>
            </tr>
          );
        })
      );
    };

    return () => {
      storeUnsubscribe();
    };
  }, []);

  return (
    <>
      {rows.map(({ id }: SetSchema) => (
        <Text>{id}</Text>
      ))}
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Set ID</th>
            <th>Map</th>
            <th>Players</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>{}</tbody>
      </Table>
    </>
  );
}
