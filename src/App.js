import React from "react";
import QuizPage from "./pages/QuizPage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Place from "./pages/Placeholder";
import ResultPage from "./pages/ResultPage";
import NewQuizPage from "./pages/NewQuizPage";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/takequiz" component={QuizPage} />
      <Route path="/results" exact component={ResultPage} />
      <Route path="/placeholder" exact component={Place} />
      <Route path="/quiz/new" exact component={NewQuizPage} />
    </Router>
  );
};

export default App;
