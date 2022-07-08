import { Badge, Table } from "@mantine/core";
import { SetPointsSchema } from "../types/schema";

export default function Sets({ sets }) {
  const rows = [] as any[];

  console.log(`Sets: ${JSON.stringify(sets, null, 2)}`);
  sets.map((set) => {
    rows.push(
      <tr key={set.id}>
        <td>{set.id}</td>
        <td>
          <Badge>{set.map}</Badge>
        </td>
        <td>
          {set.points.map((sp: SetPointsSchema) => {
            return <Badge color="blue">{sp.player.name}</Badge>;
          })}
        </td>
        <td>
          <Badge color="blue">{set.winner.name}</Badge>
        </td>
      </tr>
    );
  });
  return (
    <Table>
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
