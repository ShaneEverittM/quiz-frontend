import React from "react";
import NewQuizComponent from "../components/NewQuizComponent";
import QuizComponent from "../components/QuizComponent";
import "../styles.css";
/**
 * const data = {
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
    TODO refactor QuizComponet
   TODO make answers selectable
   TODO add results
   TODO add delete functionality
   TODO add edit functionality
  */
class NewQuizPage extends React.Component {
  state = {
    questions: [],
    quizName: " ",
    answers: [[]],
    activeAnswers: [],
    results: [],
    selectedQuestion: 0,
    selectedAnswer: 0,
  };

  updateQuizName = (quizName) => {
    this.setState({ quizName });
  };

  addResult = (result) => {
    this.setState({ results: [...this.state.results, result] });
  };

  addQuestion = (questionText) => {
    this.setState({
      questions: [...this.state.questions, questionText],
    });
    console.log("this.state.questions: ", this.state.questions);
  };

  addAnswer = (answerText, questionNum) => {
    console.log("answerText, questionNum: ", answerText, questionNum);
    let { answers } = this.state;
    if (!answers[questionNum]) answers[questionNum] = [];
    answers[questionNum] = [...answers[questionNum], answerText];
    this.setState({ answers });
    console.log("answers: ", answers);
    this.selectQuestion(questionNum);
  };

  selectQuestion = (i) => {
    this.setState({
      selectedQuestion: i,
      activeAnswers: this.state.answers[i] ? this.state.answers[i] : [],
    });

    console.log("activeAnswers: ", this.state.activeAnswers);
  };
  selectAnswer = (i) => {
    this.setState({ selectedAnswer: i });
  };
  renderAnswers = () => {
    return (
      <div>
        {console.log("this.state.activeAnswers: ", this.state.activeAnswers)}
        {this.state.activeAnswers.map((item, i) => {
          return (
            <div key={i}>
              <QuizComponent
                selectedItem={this.state.selectedAnswer}
                questionNum={i}
                onSelect={this.selectAnswer}
                text={item}
              />
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <h2>
              {this.state.quizName.replace(/\w\S*/g, function (txt) {
                return (
                  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                ); //thank you stack overflow
              })}
            </h2>
          </div>

          <label htmlFor="quizName">First Give your quiz a name!</label>
          <br />
          <input
            type="text"
            id="quizName"
            onChange={(e) => this.updateQuizName(e.target.value)}
          />
          <br />
        </div>
        <div className="container">
          <div className="createPage">
            <div>
              {this.state.questions.map((item, i) => {
                return (
                  <div key={i}>
                    <QuizComponent
                      selectedItem={this.state.selectedQuestion}
                      onSelect={this.selectQuestion}
                      questionNum={i}
                      text={item}
                    />
                  </div>
                );
              })}
              <p>Question</p>
              <NewQuizComponent
                text="add new question"
                handleAdd={this.addQuestion}
              />
            </div>

            <div className="middle-column">
              {this.state.questions.length ? this.renderAnswers() : ""}
              <p>answer:</p>
              <NewQuizComponent
                text={`new answer for question #${
                  this.state.selectedQuestion + 1
                }`}
                questionNum={this.state.selectedQuestion}
                handleAdd={this.addAnswer}
              />
            </div>

            <div>
              {" "}
              {this.state.results.map((item, i) => {
                return <div key={i}> {item}</div>;
              })}
              <p>results</p>
              <NewQuizComponent
                text="add new result"
                handleAdd={this.addResult}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewQuizPage;
