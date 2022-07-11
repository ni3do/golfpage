import prisma from "../../../lib/prisma";

// POST /api/getMaps
export default async function handle(req, res) {
  const result = await prisma.set.findMany({
    include: { points: true, winner: true, map: true },
  });
  res.json(result);
}
