"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const ResultPage = () => {
  const [score, setScore] = useState(0);
  const [quizTitle, setQuizTitle] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const scoreParam = url.searchParams.get("score");

      if (scoreParam !== null) {
        setScore(parseInt(scoreParam, 10));
      }

      // Fetch the quiz data for all quizzes (replace with your API endpoint)
      fetch("/api/getQuizzes")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch quiz data");
          }
        })
        .then((data) => {
          if (data.quizzes && data.quizzes.length > 0) {
            const firstQuiz = data.quizzes[0]; // Choose the first quiz
            setQuizTitle(firstQuiz.title);
            setTotalQuestions(firstQuiz.questions.length);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full m-16">
        <h1 className="text-3xl font-bold text-center mb-4">Quiz Result</h1>
        <p className="text-xl font-semibold mb-2">Quiz Title: {quizTitle}</p>
        <p className="text-xl font-semibold mb-2">
          Your score: {score}/{totalQuestions}
        </p>
        <div className="flex justify-between mt-4">
          <Link
            href="/thequiz"
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-700"
          >
            Take Another Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
