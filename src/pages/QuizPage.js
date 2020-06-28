import React from "react";
import { Redirect } from "react-router-dom";
import Question from "../components/Question";
import Answer from "../components/Answer";

const data = {
  quiz: { id: 1, name: "test", num_questions: 5 },
  questions: [
    { id: 1, description: "q1n", qz_id: 1 },
    { id: 2, description: "q2", qz_id: 1 },
    { id: 3, description: "q3", qz_id: 1 },
    { id: 4, description: "q4", qz_id: 1 },
    { id: 5, description: "q5", qz_id: 1 },
  ],
  answers: [
    [
      { id: 1, description: "a1", val: 0, q_id: 1 },
      { id: 1, description: "a2", val: 1, q_id: 1 },
      { id: 1, description: "a1", val: 2, q_id: 1 },
      { id: 1, description: "a2", val: 1, q_id: 1 },
    ],
    [
      { id: 2, description: "a2", val: 1, q_id: 2 },
      { id: 2, description: "a2", val: 2, q_id: 2 },
      { id: 2, description: "a2", val: 1, q_id: 2 },
      { id: 2, description: "a2", val: 0, q_id: 2 },
    ],
    [
      { id: 3, description: "a3", val: 1, q_id: 3 },
      { id: 3, description: "a3", val: 2, q_id: 3 },
    ],
    [
      { id: 4, description: "a4", val: 2, q_id: 4 },
      { id: 4, description: "a4", val: 0, q_id: 4 },
    ],
    [{ id: 5, description: "a5", val: 1, q_id: 5 }],
  ],
  results: [
    { num: 0, resultHeader: "R1", description: "D1" },
    { num: 1, resultHeader: "R2", description: "D2" },
    { num: 2, resultHeader: "R3", description: "D3" },
  ],
};

const serverURL = "https://jsonplaceholder.typicode.com/posts/1";
const serverURL2 = "http://localhost:8000/";

class QuizPage extends React.Component {
  state = {
    title: "loading",
    description: "loading",
    questions: [],
    curQuestion: 0,
    numQuestions: 2,
    redirectToResults: false,
    responses: [],
  };
  scrollRef = React.createRef();

  componentDidMount() {
    this.testAPI();
  }

  //TODO get question list from backend, display one at a time

  //TODO refactor API into it's own file

  testAPI = () => {
    fetch(serverURL)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ title: json.title, description: json.body });
      })
      .catch(this.setState({ title: "err", description: "err" }));

    //fetch(serverURL2).then(response => response.json()).then(json => console.log(json)).catch(() => console.log("we tried our best"))
  };
  renderNextQuestion = () => {
    let { curQuestion } = this.state;
    if (curQuestion < data.questions.length) {
      if (this.scrollRef.current) {
        this.scrollRef.current.scrollIntoView();
      }

      console.log("scrollRef: ", this.scrollRef);

      this.setState({
        questions: [...this.state.questions, data.questions[curQuestion]],
        curQuestion: curQuestion + 1,
      });
    }
  };

  redirect = () => {
    if (this.state.redirectToResults) {
      return (
        <Redirect
          to={{
            pathname: "/results",
            state: {
              responses: this.state.responses,
              results: data.results,
            },
          }}
        />
      );
    }
  };

  setRedirect = () => {
    this.setState({ redirectToResults: true });
  };

  renderButton = () => {
    let buttonText = "Start";
    let handle = this.renderNextQuestion;
    let hide = "";

    if (this.state.curQuestion === data.questions.length) {
      buttonText = "View Results!";
      handle = this.setRedirect;
    } else if (this.state.curQuestion !== 0) hide = "hide";
    return (
      <button className={hide} onClick={handle}>
        {buttonText}
      </button>
    );
  };

  onSelectAnswer = (answerPos, questionNum) => {
    let { responses } = this.state;
    responses[questionNum] = answerPos;
    this.setState({ responses });
    if (questionNum === this.state.curQuestion - 1) this.renderNextQuestion();
  };

  render() {
    return (
      <div>
        <h3>Title: {this.state.title}</h3>
        <p>This is a quiz:{this.state.description}</p>
        {this.state.questions.map((questionText, i) => {
          return (
            <div ref={this.scrollRef} key={i}>
              <Question question={questionText.description} />
              <Answer
                questionNum={i}
                answers={data.answers[i]}
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
