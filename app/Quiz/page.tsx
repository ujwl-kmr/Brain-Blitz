"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Quiz {
  id: string;
  title: string;
  image: string;
}

const TakeQuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getQuizzes");
        if (response.ok) {
          const data = await response.json();
          setQuizzes(data.quizzes);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mt-8 mb-8">
              Take Quiz
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
              {quizzes.map((quiz: Quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white p-4 rounded-lg shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={quiz.image}
                    alt={quiz.title}
                    className="object-cover h-72 w-full rounded-md mb-2"
                  />
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
                    <Link
                      href={`/Quiz/${quiz.id}`}
                      className="text-cyan-600 hover:underline text-xl mb-2 items-end"
                    >
                      Start Quiz
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TakeQuizPage;
