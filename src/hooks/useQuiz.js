import React, { useContext } from "react";
import { QuizProvider } from "../contexts/QuizContext";

const useQuiz = () => {
  const context = useContext(QuizProvider);
  if (context === undefined)
    throw new Error("useQuiz used outside of QuizProvider");
  return context;
};

export default useQuiz;
