import React from "react";
import CreateQuiz from "../components/CreateQuiz";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CreateQuizPage = () => {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <CreateQuiz />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CreateQuizPage;
