import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { studentId } = req.query;

    try {
      const notifications = await prisma.notification.findMany({
        where: { studentId },
        include: { test: true },
      });

      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
