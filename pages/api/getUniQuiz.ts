import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { id } = req.query; 
      if (!id) {
        return res.status(400).json({ error: "ID parameter is missing" });
      }

      const quiz = await prisma.quiz.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          questions: {
            include: {
              options: true,
            },
          },
        },
      });

      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      res.status(200).json({ quiz });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch quiz" });
    }
  } else {
    res.status(405).end();
  }
};
