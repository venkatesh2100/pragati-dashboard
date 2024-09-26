import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, teacherId } = req.body;

    try {
      const test = await prisma.test.create({
        data: {
          title,
          description,
          teacherId,
        },
      });

      const students = await prisma.student.findMany();

      await Promise.all(
        students.map(student => {
          return prisma.notification.create({
            data: {
              studentId: student.id,
              testId: test.id,
              message: `A new test "${title}" has been created. Click here to take the test!`,
            },
          });
        })
      );

      res.status(201).json(test);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
