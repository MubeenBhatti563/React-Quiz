import Header from "./components/Header";
import Loader from "./components/Loader";
import "./App.css";
import Questions from "./components/Questions";
import FinishPage from "./components/FinishPage";
import useQuiz from "./hooks/useQuiz";

function App() {
  const { status, points, dataFetching, dispatch } = useQuiz();

  return (
    <div className="app">
      <Header />
      {status === "loading" && <Loader />}
      {status === "error" && (
        <div
          style={{
            color: "red",
            backgroundColor: "lightgray",
            padding: "4px 10px",
            borderRadius: "15px",
          }}
        >
          There was an error Fetching Questions...
        </div>
      )}
      {status === "finish" && (
        <FinishPage points={points} dispatch={dispatch} />
      )}
      <main className="questions">
        {status !== "active" &&
          status !== "finish" &&
          status !== "error" &&
          status !== "loading" && (
            <div className="welcome-page">
              <h3 className="welcome-heading">Welcome to The React Quiz!</h3>
              <p className="questions-para">
                15 questions to test your React mastery
              </p>
              <button className="start" onClick={dataFetching}>
                Let's start!
              </button>
            </div>
          )}
        {status === "active" && status !== "finish" && status !== "error" && (
          <Questions />
        )}
      </main>
    </div>
  );
}

export default App;
