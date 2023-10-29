// components/QuestionCard.tsx
import React from "react";

const QuestionCard = ({ question, options }) => {
  return (
    <div className="p-4 border rounded-lg mb-4">
      <p className="text-lg font-semibold mb-2">{question}</p>
      <div>
        {options.map((option, index) => (
          <div key={index} className="mb-2">
            <input
              type="radio"
              name="options"
              id={`option${index}`}
              value={option}
            />
            <label htmlFor={`option${index}`} className="ml-2">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
