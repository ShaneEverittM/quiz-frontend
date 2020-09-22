import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import QuizPage from "./pages/QuizPage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Place from "./pages/Placeholder";
import ResultPage from "./pages/ResultPage";
import NewQuizPage from "./pages/NewQuizPage";
import Error from "./pages/ErrorPage";
import Browse from "./pages/Browse";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./styles.css";
class App extends React.Component {
  state = {
    value: localStorage.getItem("logStatus") || false,
  };

  setValue = (value) => {
    console.log("value: ", this.state.value);
    this.setState({ value });
    // localStorage.setItem("logStatus", value);
  };

  render() {
    return (
      <Router>
        <Navbar log={this.state.value} />

        <Route path="/" exact component={Home} />
        <Route path="/takequiz" component={QuizPage} />
        <Route path="/results" exact component={ResultPage} />
        <Route path="/placeholder" exact component={Place} />
        <Route path="/quiz/new" exact component={NewQuizPage} />
        <Route path="/error" component={Error} />
        <Route path="/browse" component={Browse} />
        <Route path="/search" component={Search} />
        <Route path="/register" component={Register} />
        <Route
          path="/login"
          render={(props) => (
            <Login {...props} log={this.state.value} setLog={this.setValue} />
          )}
        />
      </Router>
    );
  }
}

export default App;
