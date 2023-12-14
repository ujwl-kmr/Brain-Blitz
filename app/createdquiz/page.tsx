import React from "react";
import CreatedQuiz from "../components/CreatedQuiz";

const CreatedQuizPage = () => {
  return (
    <div>
      <div className="flex flex-col min-h-min">
        <main className="mb-20">
          <CreatedQuiz />
        </main>
      </div>
    </div>
  );
};

export default CreatedQuizPage;
