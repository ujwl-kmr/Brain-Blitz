import { calculateScore } from "@/app/components/scoreCalculator";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req:NextApiRequest, res:NextApiResponse) => {
  try {
    const userAnswers = req.body.userAnswers; 
    const quiz = req.body.quiz; 
    const score = calculateScore(userAnswers, quiz);

    res.status(200).json({ score });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

