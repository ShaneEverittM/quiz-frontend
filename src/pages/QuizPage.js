import React from "react";
import { Redirect } from "react-router-dom";
import QuizQuestion from "../components/QuizQuestion";
import { getQuiz } from "../api/api.js";
import GetTwitter from "../components/GetTwitter";
import "./QuizPage.css";

class QuizPage extends React.Component {
  state = {
    title: "loading",
    description: "loading",
    questions: [],
    curQuestion: 0,
    numQuestions: 0,
    redirectToResults: false,
    redirectToError: false,
    responses: [],
    data: [],
    resultButton: false,
    showTweets: false,
  };
  scrollRef = React.createRef();

  componentDidMount() {
    let id = this.props.location.pathname.substring(10);
    if (id === "tweets") {
      this.queryTweets();
    } else this.queryQuiz(id);
  }

  queryTweets = () => {
    this.setState({
      showTweets: true,
      title: "Who want's to be a twitter comedian?",
      description:
        "You found the secret page!! Enter two Twitter usernames to get some of their tweets, and then vote for the one you like more!",
    });
  };
  queryQuiz = async (id) => {
    let { data } = await getQuiz(id);

    if (data && data.quiz) {
      let { description, name } = data.quiz;

      let numQuestions = data.questions.length;

      this.setState({ data, title: name, numQuestions, description });
    } else this.setState({ redirectToError: true });
  };

  renderNextQuestion = () => {
    let { curQuestion } = this.state;
    if (curQuestion < this.state.data.questions.length) {
      if (this.scrollRef.current) {
        this.scrollRef.current.scrollIntoView();
      }
      this.setState({
        questions: [
          ...this.state.questions,
          this.state.data.questions[curQuestion],
        ],
        curQuestion: curQuestion + 1,
      });
    }
  };

  redirect = () => {
    let pathname = "";
    let redirct = false;
    let state = {};
    if (this.state.redirectToError) {
      pathname = "/error";

      redirct = true;
    }

    if (this.state.redirectToResults) {
      pathname = "/results";
      redirct = true;
      state = {
        responses: this.state.responses,
        results: this.state.data.results,
      };
    }

    if (redirct) {
      return (
        <Redirect
          to={{
            pathname,
            state,
          }}
        />
      );
    }
  };

  setRedirect = () => {
    this.setState({ redirectToResults: true });
  };

  renderButton = () => {
    if (
      this.state.curQuestion === 0 &&
      this.state.data.questions &&
      this.state.data.questions.length > 0
    )
      return (
        <button className="submit-button" onClick={this.renderNextQuestion}>
          Start!
        </button>
      );

    if (this.state.resultButton) {
      if (this.scrollRef.current) {
        this.scrollRef.current.scrollIntoView();
      }
      return (
        <button
          ref={this.scrollRef}
          className="submit-button"
          onClick={this.setRedirect}
        >
          View Results!
        </button>
      );
    }
  };

  onSelectAnswer = (answerPos, questionNum) => {
    let { responses } = this.state;
    responses[questionNum] = this.state.data.answers[questionNum][
      answerPos
    ].val;
    this.setState({ responses });
    if (questionNum === this.state.curQuestion - 1) this.renderNextQuestion();
    if (this.state.data.questions.length === this.state.responses.length)
      this.setState({ resultButton: true });
  };

  setTweets = (data) => {
    this.setState({
      data,
      numQuestions: data.questions.length,
      questions: [],
      responses: [],
      curQuestion: 0,
    });
  };

  renderTweetInput = () => {
    return (
      <div>
        <GetTwitter setTweets={this.setTweets} />
      </div>
    );
  };

  render() {
    return (
      <div className="quizPage-container">
        <h3>{this.state.title}</h3>
        <p>{this.state.description}</p>
        <p>{`${this.state.curQuestion}/${this.state.numQuestions}`}</p>
        {this.state.showTweets ? this.renderTweetInput() : ""}
        {this.state.questions.map((questionText, i) => {
          return (
            <div ref={this.scrollRef} key={i}>
              <QuizQuestion
                question={questionText.description}
                questionNum={i}
                answers={this.state.data.answers[i]}
                onSelect={this.onSelectAnswer}
              />
            </div>
          );
        })}
        {this.renderButton()}
        {this.redirect()}
      </div>
    );
  }
}

export default QuizPage;
