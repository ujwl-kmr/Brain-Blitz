// pages/api/deleteQuiz.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { id } = req.body;

      // Find the questions related to the quiz
      const relatedQuestions = await prisma.question.findMany({
        where: { quizId: id },
      });

      // Delete the related questions and their options
      for (const question of relatedQuestions) {
        const relatedOptions = await prisma.option.findMany({
          where: { questionId: question.id },
        });

        // Delete the options related to the question
        await prisma.option.deleteMany({
          where: { questionId: question.id },
        });

        // Delete the question
        await prisma.question.delete({
          where: { id: question.id },
        });
      }

      // Delete the quiz
      await prisma.quiz.delete({
        where: { id: id },
      });

      res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete quiz" });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
};
