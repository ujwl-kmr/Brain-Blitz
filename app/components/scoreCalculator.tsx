export const calculateScore = (userAnswers, quiz) => {
  let correctAnswers = 0;
  for (const question of quiz.questions) {
    const userAnswer = userAnswers[question.id];
    const correctOptionIndex = question.correctOption;

    const userAnswerIndex = question.options.findIndex(
      (option) => option.id === userAnswer
    );

    if (userAnswerIndex === correctOptionIndex) {
      correctAnswers++;
    }
  }
  return correctAnswers;
};
