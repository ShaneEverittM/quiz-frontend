import React from "react";
import QuizComponent from "../components/QuizComponent";
import NewAnswer from "../components/NewAnswer";
import NewQuestion from "../components/NewQuestion";
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
 */

class NewQuizPage extends React.Component {
  state = {
    questions: [],
    quizName: " ",
    answers: [[]],
    activeAnswers: [],
    results: [],
    selectedQuestion: 0,
  };

  updateField = (quizName) => {
    this.setState({ quizName });
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
    this.activateAnswers(questionNum);
  };

  activateAnswers = (i) => {
    this.setState({
      selectedQuestion: i,
      activeAnswers: this.state.answers[i] ? this.state.answers[i] : [],
    });

    console.log("activeAnswers: ", this.state.activeAnswers);
  };
  renderAnswers = () => {
    return (
      <div>
        {console.log("this.state.activeAnswers: ", this.state.activeAnswers)}
        {this.state.activeAnswers.map((item, i) => {
          return <div key={i}>{item}</div>;
        })}
        <p>answer:</p>
        <QuizComponent
          questionNum={this.state.selectedQuestion}
          handleAdd={this.addAnswer}
        />
      </div>
    );
  };

  render() {
    return (
      <div>
        <div>
          <h2>
            {this.state.quizName.replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); //thank you stack overflow
            })}
          </h2>
        </div>

        <label htmlFor="quizName">First Give your quiz a name!</label>
        <br />
        <input
          type="text"
          id="quizName"
          onChange={(e) => this.updateField(e.target.value)}
        />
        <br />
        {this.state.questions.map((item, i) => {
          return (
            <div key={i}>
              {
                <NewQuestion
                  selectedQuestion={this.state.selectedQuestion}
                  select={this.activateAnswers}
                  questionNum={i}
                  question={item}
                />
              }
            </div>
          );
        })}

        <p>Question</p>
        <QuizComponent questionText="add new" handleAdd={this.addQuestion} />
        {this.state.questions.length ? this.renderAnswers() : ""}
      </div>
    );
  }
}

export default NewQuizPage;
