import { Table } from "@mantine/core";
import { SetSchema, StatsSchema } from "../types/schema";

type Props = {
  sets: SetSchema[];
};

export default function Leaderboard({ sets }: Props) {
  const rows = [] as any[];

  const stats = getStats(sets) as StatsSchema;

  for (let player of Object.keys(stats.playerStats)) {
    const playerStats = stats.playerStats[player];

    rows.push(
      <tr key={playerStats.name}>
        <td>{playerStats.name}</td>
        <td>{playerStats.wins}</td>
        <td>{playerStats.points}</td>
        <td>{playerStats.setsPlayed}</td>
      </tr>
    );
  }

  if (rows.length === 0) {
    return null;
  }
  return (
    <>
      <Table verticalSpacing="md" fontSize="sm">
        <thead>
          <tr>
            <th>Player</th>
            <th>Set wins</th>
            <th>Points</th>
            <th>Sets Played</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}

export function getStats(sets: SetSchema[]) {
  const stats = {
    setCount: 0,
    playerStats: {},
  } as StatsSchema;

  for (let set of sets) {
    stats.setCount++;

    if (set.winner) {
      if (Object.keys(stats.playerStats).includes(set.winner.name)) {
        stats.playerStats[set.winner.name].wins++;
      } else {
        stats.playerStats[set.winner.name] = {
          wins: 1,
          losses: 0,
          name: set.winner.name,
          points: 0,
          setsPlayed: 1,
        };
      }
    }

    for (let setPoints of set.points) {
      if (Object.keys(stats.playerStats).includes(setPoints.player.name)) {
        stats.playerStats[setPoints.player.name].points += setPoints.points;
      } else {
        stats.playerStats[setPoints.player.name] = {
          wins: 0,
          losses: 0,
          name: setPoints.player.name,
          points: setPoints.points,
          setsPlayed: 1,
        };
      }
    }
  }
  return stats;
}
