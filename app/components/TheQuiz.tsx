"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Question {
  id: number;
  questionText: string;
  options: Option[];
  correctOption: number;
}

interface Option {
  id: number;
  text: string[];
}

interface Quiz {
  title: string;
  questions: Question[];
}

const TheQuizPage = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<{ [questionId: number]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getQuizzes");
        if (response.ok) {
          const data = await response.json();
          if (data.quizzes && data.quizzes.length > 0) {
            console.log("API Data:", data.quizzes[0]);
            setQuiz(data.quizzes[0]);
          } else {
            console.error("No quizzes found in the API response.");
          }
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleAnswerChange = (questionId: number, answer: number) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmitQuiz = async () => {
    try {
      const response = await fetch("/api/calculateScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userAnswers: answers, quiz }),
      });

      if (response.ok) {
        const result = await response.json();
        // Redirect to the ResultPage and pass the score as a query parameter
        window.location.href = `/result?score=${result.score}`;
      } else {
        console.error("Failed to calculate score");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full m-14">
        <h1 className="text-3xl font-bold text-center mb-8">{quiz.title}</h1>
        <ul>
          {quiz.questions
            ? quiz.questions.map((question) => (
                <li key={question.id} className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {question.questionText}
                  </h2>
                  <ul>
                    {question.options
                      ? question.options.map((option) => (
                          <li key={option.id}>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`question_${question.id}`}
                                value={option.id}
                                onChange={() =>
                                  handleAnswerChange(question.id, option.id)
                                }
                                checked={answers[question.id] === option.id}
                                className="mr-2"
                              />
                              {option.text}
                            </label>
                          </li>
                        ))
                      : null}
                  </ul>
                </li>
              ))
            : null}
        </ul>
        <button
          onClick={handleSubmitQuiz}
          className="bg-cyan-500 text-white py-2 px-4 mt-4 rounded hover:bg-cyan-700"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default TheQuizPage;
