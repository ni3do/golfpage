import prisma from "../../../lib/prisma";
import { SetSchema } from "../../../types/schema";

// POST /api/createSet
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  console.log(JSON.stringify(req.body, null, 2));
  const { id, createdAt, map, points, updatedAt, winner } = JSON.parse(
    JSON.stringify(req.body)
  ) as SetSchema;

  const result = await prisma.set.create({
    data: {
      map: map,
      points: {
        createMany: {
          data: points.map((points) => ({
            playerName: points.player.name,
            points: points.points,
          })),
        },
      },
      winner: { connect: { name: winner.name } },
    },
  });
  res.json(result);
}
