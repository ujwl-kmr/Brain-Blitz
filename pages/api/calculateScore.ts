import { calculateScore } from "@/app/components/scoreCalculator";

export default async (req, res) => {
  try {
    const userAnswers = req.body.userAnswers; // Assuming you send user answers in the request
    const quiz = req.body.quiz; // Assuming you send quiz data in the request
    const score = calculateScore(userAnswers, quiz);

    res.status(200).json({ score });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

