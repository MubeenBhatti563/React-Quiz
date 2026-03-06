import React, { createContext, useReducer } from "react";

const SEC_PER_QUEST = 30;
const initialState = {
  questions: [],
  status: null,
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemain: 10,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemain: state.questions.length * SEC_PER_QUEST,
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.answer ? state.points + 10 : state.points,
      };
    }
    case "newQuest":
      return {
        ...state,
        index:
          state.index === state.questions.length - 1
            ? state.index
            : state.index + 1,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        status: state.secondsRemain === 0 ? "finish" : state.status,
        secondsRemain: state.secondsRemain - 1,
      };
    case "load":
      return {
        ...state,
        status: "loading",
      };

    default:
      throw new Error("Action unknown");
  }
}
const QuizProvider = createContext();
const QuizContext = ({ children }) => {
  const [
    { questions, status, index, answer, points, secondsRemain },
    dispatch,
  ] = useReducer(reducer, initialState);
  const dataFetching = () => {
    dispatch({ type: "load" });
    setTimeout(() => {
      fetch("http://localhost:3000/questions")
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "dataReceived", payload: data });
          dispatch({ type: "start" });
        })
        .catch((err) => dispatch({ type: "dataFailed", payload: err }));
    }, 1000);
  };
  return (
    <QuizProvider.Provider
      value={{
        questions: questions,
        status: status,
        index: index,
        answer: answer,
        points: points,
        secondsRemain: secondsRemain,
        dataFetching,
        dispatch,
      }}
    >
      {children}
    </QuizProvider.Provider>
  );
};

export { QuizProvider };
export default QuizContext;
