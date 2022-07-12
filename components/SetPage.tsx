import { Badge, Table } from "@mantine/core";
import { useEffect } from "react";
import { connect } from "react-redux";
import { selectMaps, setMaps, setupMaps } from "../store/maps";
import { selectPlayers, setPlayers, setupPlayers } from "../store/players";
import { selectSets, setSets, setupSets } from "../store/sets";
import { store } from "../store/store";
import { SetPointsSchema, SetSchema } from "../types/schema";

const mapStateToProps = (state) => {
  const sets = state.sets.value as SetSchema[];
  const rows = sets.map((set: SetSchema) => (
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
  ));
  return {
    maps: selectMaps(state),
    players: selectPlayers(state),
    sets: sets,
    rows: rows,
  };
};

function Sets({ maps, players, sets, rows }) {
  useEffect(() => {
    store.dispatch(setupMaps());
    store.dispatch(setupPlayers());
    store.dispatch(setupSets());

    const storeUnsubscribe = store.subscribe(() => {
      setMaps(selectMaps(store.getState()));
      setPlayers(selectPlayers(store.getState()));
      setSets(selectSets(store.getState()));
    });

    return () => {
      storeUnsubscribe();
    };
  }, []);

  return (
    <Table highlightOnHover>
      <thead>
        <tr>
          <th>Set ID</th>
          <th>Map</th>
          <th>Players</th>
          <th>Winner</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default connect(mapStateToProps)(Sets);
