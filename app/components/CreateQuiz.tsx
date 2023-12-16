"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateQuizPage = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizImage, setQuizImage] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctOption: 0,
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctOption: 0,
      },
    ]);
  };

  const handleQuestionChange = (
    index: number,
    field: "questionText" | "correctOption" | "options",
    value: string | number | string[],
    optionIndex?: number
  ) => {
    const updatedQuestions = [...questions];
    if (field === "questionText") {
      updatedQuestions[index].questionText = value as string;
    } else if (field === "correctOption") {
      updatedQuestions[index].correctOption = value as number;
    } else if (field === "options" && optionIndex !== undefined) {
      const updatedOptions = [...updatedQuestions[index].options];
      updatedOptions[optionIndex] = value as string;
      updatedQuestions[index].options = updatedOptions;
    }

    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const isAnyFieldEmpty =
      quizTitle.trim() === "" ||
      quizImage.trim() === "" ||
      questions.some(
        (question) =>
          question.questionText.trim() === "" ||
          question.options.some((option) => option.trim() === "")
      );

    if (isAnyFieldEmpty) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch("/api/createQuiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizTitle,
          quizImage,
          questions,
          userEmail: localStorage.getItem("userEmail"),
        }),
      });

      if (response.ok) {
        console.log("Quiz created successfully!");
        toast.success("Quiz submitted successfully");
        setQuizTitle("");
        setQuizImage("");
        setQuestions([
          {
            questionText: "",
            options: ["", "", "", ""],
            correctOption: 0,
          },
        ]);
      } else {
        const data = await response.json();
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="p-10 w-full max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-6">
          <h1 className="text-3xl font-extrabold text-center">Create Quiz</h1>
          <form>
            <label
              htmlFor="quizTitle"
              className="block text-xl font-medium text-gray-700 mb-2"
            >
              Quiz Title
            </label>
            <input
              type="text"
              id="quizTitle"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />

            <label
              htmlFor="quizImage"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Quiz Image
            </label>
            <input
              type="text"
              id="quizImage"
              value={quizImage}
              onChange={(e) => setQuizImage(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />

            {questions.map((question, index) => (
              <div key={index} className="mb-4">
                <label
                  htmlFor={`question${index}`}
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Question {index + 1}
                </label>
                <input
                  type="text"
                  id={`question${index}`}
                  value={question.questionText}
                  onChange={(e) =>
                    handleQuestionChange(index, "questionText", e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                />

                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-2 mt-2"
                  >
                    <input
                      type="radio"
                      id={`correctOption${index}${optionIndex}`}
                      name={`correctOption${index}`}
                      value={optionIndex}
                      checked={question.correctOption === optionIndex}
                      onChange={() =>
                        handleQuestionChange(
                          index,
                          "correctOption",
                          optionIndex
                        )
                      }
                      className="w-8"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleQuestionChange(
                          index,
                          "options",
                          e.target.value,
                          optionIndex
                        )
                      }
                      className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    />
                  </div>
                ))}
              </div>
            ))}

            <button
              type="button"
              onClick={addQuestion}
              className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded"
            >
              Add Question
            </button>

            <button
              type="button"
              className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded ml-44"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateQuizPage;
