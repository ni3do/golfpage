import { Card, Group, Text, Title } from "@mantine/core";
import { PlayerSchema } from "../../types/schema";

type Props = {
  player: PlayerSchema;
};
export function PlayerCard({ player }: Props) {
  return (
    <div style={{ width: "auto", margin: "auto" }}>
      <Card shadow="lg" p="lg" radius={18}>
        <Group position="apart" style={{ marginBottom: "auto" }}>
          <Title order={2}>{player.name}</Title>
        </Group>
        <Group grow={true}>
          <Text align="left" size="lg">
            Sets played:
          </Text>
          <Text align="right" size="lg">
            {player.setPoints.length}
          </Text>
        </Group>

        <Group grow={true}>
          <Text size="lg">Playing since:</Text>
          <Text align="right" size="lg">
            {new Date(player.createdAt).toLocaleDateString()}
          </Text>
        </Group>
      </Card>
    </div>
  );
}
