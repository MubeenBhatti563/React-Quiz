import React from "react";

const FinishPage = ({ points, dispatch }) => {
  const percentage = Math.round((points / 150) * 100, 2);

  // Quick Emoji logic for fun
  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80) emoji = "🥳";
  else if (percentage >= 50) emoji = "🙃";
  else emoji = "🤨";

  return (
    <div className="finish-container">
      <div className="result-badge">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of {150} (
        {percentage}%)
      </div>

      <p className="highscore">Highscore: {points} points</p>

      <button
        className="restart-btn"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default FinishPage;
