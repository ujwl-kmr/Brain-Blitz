import React from "react";
import TheQuiz from "../components/TheQuiz";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TheQuizPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <TheQuiz />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default TheQuizPage;
