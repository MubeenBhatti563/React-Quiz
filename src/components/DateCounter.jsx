import React, { useReducer } from "react";

// Move static data outside to avoid re-creating the base date on every render
const BASE_DATE = new Date("Nov 02 2025");
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}

const DateCounter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // Derive the display date from the 'count' state
  const date = new Date(BASE_DATE);
  date.setDate(date.getDate() + count);

  const reset = () => {
    let conf = confirm("Are you sure you want to reset everything?");
    if (conf) {
      dispatch({ type: "reset" });
    } else return;
  };
  const inc = () => {
    dispatch({ type: "inc" });
  };

  const dec = () => {
    dispatch({ type: "dec" });
  };

  const defineCount = (e) => {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = (e) => {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  return (
    <div
      className="date-cont"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.6em",
        alignItems: "center",
      }}
    >
      <div className="step">
        <input
          type="range"
          min={1}
          max={10}
          value={step}
          // CONVERT TO NUMBER HERE
          onChange={defineStep}
        />
        <span>Step: {step}</span>
      </div>

      <div className="count">
        <button style={{ padding: "5px 6px" }} onClick={dec}>
          -
        </button>
        {/* <span>Count: {count}</span> */}
        <input
          style={{ padding: "5px 6px" }}
          type="number"
          value={count}
          onChange={defineCount}
        />
        <button style={{ padding: "5px 6px" }} onClick={inc}>
          +
        </button>
      </div>

      <div className="date">
        {count === 0
          ? "Today is "
          : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        {date.toDateString()}
      </div>
      <button style={{ padding: "5px 6px" }} className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default DateCounter;
