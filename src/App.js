import React from "react";
import Cookies from "js-cookie";
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
import Profile from "./pages/Profile";

import "./styles.css";
class App extends React.Component {
  state = {
    loggedIn: Cookies.get("logStatus") === "true",
  };

  setLog = (loggedIn) => {
    this.setState({ loggedIn });
    Cookies.set("logStatus", loggedIn);
  };

  render() {
    return (
      <Router>
        <Navbar log={this.state.loggedIn} />

        <Route path="/" exact component={Home} />
        <Route path="/takequiz" component={QuizPage} />
        <Route path="/results" exact component={ResultPage} />
        <Route path="/placeholder" exact component={Place} />
        <Route path="/quiz/new" exact component={NewQuizPage} />
        <Route path="/error" component={Error} />
        <Route path="/browse" component={Browse} />
        <Route path="/search" component={Search} />
        <Route
          path="/register"
          render={(props) => (
            <Register
              {...props}
              log={this.state.loggedIn}
              setLog={this.setLog}
            />
          )}
        />
        <Route
          path="/profile"
          render={(props) => (
            <Profile
              {...props}
              setLog={this.setLog}
              log={this.state.loggedIn}
            />
          )}
        />
        <Route
          path="/login"
          render={(props) => (
            <Login {...props} setLog={this.setLog} log={this.state.loggedIn} />
          )}
        />
      </Router>
    );
  }
}

export default App;
