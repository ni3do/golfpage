import prisma from "../../../lib/prisma";
import { MapSchema } from "../../../types/schema";

// POST /api/createMap
export default async function handle(req, res) {
  const { name } = JSON.parse(req.body.data) as MapSchema;
  const result = await prisma.map.create({
    data: {
      name: name,
    },
  });
  res.json(result);
}
