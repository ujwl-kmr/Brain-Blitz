"use client";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const CreatedQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getQuizzes");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
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

  const deleteQuiz = async (id) => {
    try {
      const response = await fetch("/api/deleteQuiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        // Quiz deleted successfully, update the state
        setQuizzes((prevQuizzes) =>
          prevQuizzes.filter((quiz) => quiz.id !== id)
        );
        console.log("Quiz deleted successfully!");
      } else {
        const data = await response.json();
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-4xl font-bold text-center mt-8 mb-8">
        Created Quizzes
      </h1>
      <table className="w-full text-xl mb-10">
        <thead>
          <tr>
            <th className="text-center py-4">Title</th>
            <th className="text-center py-4">Number of Questions</th>
            <th className="text-center py-4">Created Date</th>
            <th className="text-center py-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id} className="my-2">
              <td className="text-center py-2">{quiz.title}</td>
              <td className="text-center py-2">{quiz.questions.length}</td>
              <td className="text-center py-2">
                {new Date(quiz.createdAt).toLocaleString()}
              </td>
              <td className="flex items-center justify-center py-2">
                <button onClick={() => deleteQuiz(quiz.id)}>
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreatedQuizzes;
