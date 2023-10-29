import React from "react";
import CreatedQuiz from "../components/CreatedQuiz";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CreatedQuizPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <CreatedQuiz />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CreatedQuizPage;
