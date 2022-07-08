import { Badge, Table } from "@mantine/core";
import { SetSchema, StatsSchema } from "../types/schema";

type Props = {
  sets: SetSchema[];
};

export default function Leaderboard({ sets }: Props) {
  const rows = [] as any[];

  const stats = getStats(sets) as StatsSchema;

  for (let player of Object.keys(stats.playerStats)) {
    const playerStats = stats.playerStats[player];

    let bestMap = "";
    let mostWins = 0;
    for (let map of Object.keys(playerStats.mapWins)) {
      if (playerStats.mapWins[map] > mostWins) {
        bestMap = map;
        mostWins = playerStats.mapWins[map];
      }
    }
    rows.push(
      <tr key={playerStats.name}>
        <td>{playerStats.name}</td>
        <td>{playerStats.wins}</td>
        <td>{playerStats.points}</td>
        <td>{playerStats.setsPlayed}</td>
        <td>
          <Badge color="violet">{bestMap}</Badge>
        </td>
        <td>{playerStats.mapWins[bestMap]}</td>
        <td>{playerStats.swooshes}</td>
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
            <th>Best Map</th>
            <th>Best Map Wins</th>
            <th>Swooshes</th>
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
        if (
          Object.keys(stats.playerStats[set.winner.name].mapWins).includes(
            set.map
          )
        ) {
          stats.playerStats[set.winner.name].mapWins[set.map]++;
        } else {
          stats.playerStats[set.winner.name].mapWins[set.map] = 1;
        }
      } else {
        stats.playerStats[set.winner.name] = {
          wins: 1,
          losses: 0,
          name: set.winner.name,
          points: 0,
          setsPlayed: 0,
          swooshes: 0,
          mapWins: {},
        };
        stats.playerStats[set.winner.name].mapWins[set.map] = 1;
      }
    }

    let swooshWin = true;

    for (let setPoints of set.points) {
      if (Object.keys(stats.playerStats).includes(setPoints.player.name)) {
        if (
          setPoints.player.name !== set.winner.name &&
          setPoints.points !== 0
        ) {
          swooshWin = false;
        }

        stats.playerStats[setPoints.player.name].points += setPoints.points;
        stats.playerStats[setPoints.player.name].setsPlayed++;
      } else {
        stats.playerStats[setPoints.player.name] = {
          wins: 0,
          losses: 0,
          name: setPoints.player.name,
          points: setPoints.points,
          setsPlayed: 1,
          swooshes: 0,
          mapWins: {},
        };
      }
    }

    if (swooshWin) {
      stats.playerStats[set.winner.name].swooshes++;
    }
  }
  return stats;
}
