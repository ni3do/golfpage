import prisma from "../../../lib/prisma";
import { PlayerSchema } from "../../../types/schema";

// POST /api/createPlayer
export default async function handle(req, res) {
  const { name } = JSON.parse(req.body.data) as PlayerSchema;
  const result = await prisma.player.create({
    data: {
      name: name,
    },
  });
  res.json(result);
}
