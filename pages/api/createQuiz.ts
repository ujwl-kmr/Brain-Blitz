import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { quizTitle, quizImage, questions } = req.body;

      const quiz = await prisma.quiz.create({
        data: {
          title: quizTitle,
          image: quizImage, // Use the image URL as is
        },
      });

      for (const questionData of questions) {
        const { questionText, options, correctOption } = questionData;

        const question = await prisma.question.create({
          data: {
            questionText,
            correctOption,
            quizId: quiz.id,
          },
        });

        for (const optionText of options) {
          await prisma.option.create({
            data: {
              text: optionText,
              questionId: question.id,
            },
          });
        }
      }

      res.status(201).json({ success: true, quiz });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating quiz" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).end();
  }
};
