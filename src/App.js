import React from "react";
import QuizPage from "./pages/QuizPage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Place from "./pages/Placeholder";
import ResultPage from "./pages/ResultPage";
import NewQuizPage from "./pages/NewQuizPage";
import Error from "./pages/ErrorPage";
import Browse from "./pages/Browse";
import Search from "./pages/Search";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles.css";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/takequiz" component={QuizPage} />
      <Route path="/results" exact component={ResultPage} />
      <Route path="/placeholder" exact component={Place} />
      <Route path="/quiz/new" exact component={NewQuizPage} />
      <Route path="/error" component={Error} />
      <Route path="/browse" component={Browse} />
      <Route path="/search" component={Search} />
    </Router>
  );
};

export default App;
