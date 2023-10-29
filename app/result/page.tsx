import React from "react";
import Result from "../components/Result";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CreatedQuizPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Result />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CreatedQuizPage;
