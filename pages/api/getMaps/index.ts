import prisma from "../../../lib/prisma";

// POST /api/getMaps
export default async function handle(req, res) {
  const result = await prisma.map.findMany({});
  res.json(result);
}
