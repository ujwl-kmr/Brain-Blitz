import React from "react";
import CreateQuiz from "../components/CreateQuiz";

const CreateQuizPage = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <CreateQuiz />
        </main>
      </div>
    </div>
  );
};

export default CreateQuizPage;
