import prisma from "../../../lib/prisma";

// POST /api/getPlayer
export default async function handle(req, res) {
  const result = await prisma.player.findMany({
    include: { sets: true, setPoints: true },
  });
  res.json(result);
  // return result;
}
