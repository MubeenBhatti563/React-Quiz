import React from "react";
import NextButton from "./NextButton";
import Timer from "./Timer";
import useQuiz from "../hooks/useQuiz";

const Questions = () => {
  const { index, questions, points, answer, dispatch, secondsRemain } =
    useQuiz();
  const numQuestions = questions.length;
  const question = questions[index];
  const progressPercentage = ((index + 1) / numQuestions) * 100;

  return (
    <div className="multiple-container">
      <div className="score-calc">
        <div className="progress-bar"></div>
        <div
          className="progress-bar1"
          style={{
            width: `${progressPercentage}%`,
          }}
        ></div>
        <div className="points-score-bar">
          <p className="question-no">
            Question {index + 1} / {numQuestions}
          </p>
          <p className="points">
            {points} / {numQuestions * 10} points
          </p>
        </div>
      </div>
      <div className="questions-container">
        <h3 className="question">{question.question}</h3>
        <div className="mcqs">
          {question.options.map((option, i) => {
            const isCorrect = i === question.answer;
            const hasAnswered = answer !== null;
            return (
              <button
                className={`mcq1 
                ${i === answer ? "answer" : ""} 
                ${hasAnswered ? (isCorrect ? "correct" : "wrong") : ""}`}
                key={option}
                disabled={hasAnswered}
                onClick={() => dispatch({ type: "newAnswer", payload: i })}
              >
                {option}
              </button>
            );
          })}
        </div>
        <div className="timer-next">
          <Timer dispatch={dispatch} secondsRemain={secondsRemain} />
          {answer !== null && (
            <NextButton
              dispatch={dispatch}
              numQuestions={numQuestions}
              index={index}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
