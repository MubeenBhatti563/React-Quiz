import React from "react";

const NextButton = ({ dispatch, index, numQuestions }) => {
  if (index < numQuestions - 1)
    return (
      <button
        className="next"
        onClick={() => {
          dispatch({ type: "newQuest" });
          dispatch({ type: "newAnswer", payload: null });
        }}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button className="next" onClick={() => dispatch({ type: "finish" })}>
        Finish
      </button>
    );
};

export default NextButton;
