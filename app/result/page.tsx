"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const ResultPage = () => {
  const [score, setScore] = useState(0);
  const [quizTitle, setQuizTitle] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const receivedScore = urlParams.get("score");
    const receivedTitle = urlParams.get("title");
    const receivedLength = urlParams.get("length");

    if (receivedScore && receivedTitle && receivedLength) {
      setScore(parseInt(receivedScore, 10));
      setQuizTitle(receivedTitle);
      setTotalQuestions(parseInt(receivedLength, 10));
    }
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full m-16">
        <h1 className="text-3xl font-bold text-center mb-4">Quiz Result</h1>
        <p className="text-xl font-semibold mb-2">Quiz Title: {quizTitle}</p>
        <p className="text-xl font-semibold mb-2">
          Your score: {score}/{totalQuestions}
        </p>
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
            onClick={() => window.history.back()}
          >
            Try Again
          </button>
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
