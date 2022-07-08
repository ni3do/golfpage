import prisma from "../../../lib/prisma";
import { PlayerSchema } from "../../../types/schema";

// POST /api/createPlayer
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  console.log(JSON.stringify(req.body, null, 2));
  const { name } = JSON.parse(JSON.stringify(req.body)) as PlayerSchema;

  const result = await prisma.player.create({
    data: {
      name: name,
    },
  });
  res.json(result);
}
