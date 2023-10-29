import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const quizzes = await prisma.quiz.findMany({
        include: {
          questions: {
            include: {
              options: true,
            },
          },
        },
      });
      res.status(200).json({ quizzes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch quizzes" });
    }
  } else {
    res.status(405).end();
  }
};
