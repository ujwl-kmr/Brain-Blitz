interface UserAnswers {
  [questionId: number]: number;
}

interface Option {
  id: number;
}

interface Question {
  id: number;
  correctOption: number;
  options: Option[];
}

interface Quiz {
  title: string;
  questions: Question[];
}

export const calculateScore = (userAnswers: UserAnswers, quiz: Quiz) => {
  let correctAnswers = 0;
  const quizTitle = quiz.title;
  const quizLength = quiz.questions.length;

  for (const question of quiz.questions) {
    const userAnswer = userAnswers[question.id];
    const correctOptionIndex = question.correctOption;

    const userAnswerIndex = question.options.findIndex(
      (option: Option) => option.id === userAnswer
    );

    if (userAnswerIndex === correctOptionIndex) {
      correctAnswers++;
    }
  }

  return {
    correctAnswers,
    quizTitle,
    quizLength,
  };
};
