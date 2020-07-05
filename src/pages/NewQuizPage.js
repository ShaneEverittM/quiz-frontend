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

   TODO add edit functionality
   TODO render all quiz components in function
  */
class NewQuizPage extends React.Component {
  state = {
    questions: [],
    quizName: " ",
    answers: [[]],
    activeAnswers: [],
    results: [],
    selectedQuestion: -1,
    selectedAnswer: -1,
    selectedResult: -1,
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
  };

  addAnswer = (answerText, questionNum) => {
    let ans = { description: answerText, val: null };
    let { answers } = this.state;
    if (!answers[questionNum]) answers[questionNum] = [];
    answers[questionNum] = [...answers[questionNum], ans];
    this.setState({ answers });
    this.selectQuestion(questionNum);
  };

  selectQuestion = (i) => {
    this.setState({
      selectedQuestion: i,
      selectedAnswer: 0,
      activeAnswers: this.state.answers[i] ? this.state.answers[i] : [],
    });
  };
  selectAnswer = (i) => {
    this.setState({ selectedAnswer: i, selectedResult: -1 });
  };
  selectResult = (i) => {
    this.setState({ selectedResult: i });
    if (
      this.state.answers[this.state.selectedQuestion][this.state.selectedAnswer]
    )
      this.matchResultsToAnswers(i);
  };
  matchResultsToAnswers = (i) => {
    let { answers } = this.state;
    answers[this.state.selectedQuestion][this.state.selectedAnswer].val = i;
    this.setState({ answers });
  };

  onUnload = (e) => {
    e.preventDefault();
    e.returnValue = "You will lose your progress if you leave now!";
  };
  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
  }

  deleteResult = (i) => {
    let { results, answers } = this.state;
    results.splice(i, 1);

    for (let ar of answers) {
      for (let ans of ar)
        if (ans.val === i) {
          ans.val = null;
        }
    }
    this.setState({ results, answers });
  };
  deleteAnswer = (i) => {
    let { answers } = this.state;
    answers[this.state.selectedQuestion].splice(i, 1);
    this.setState({ answers });
  };
  deleteQuestion = (i) => {
    let { questions, answers } = this.state;
    questions.splice(i, 1);
    answers[i] = [];
    this.setState({ questions, answers, activeAnswers: [] });
  };

  randerColumn = (
    type,
    selectedItem,
    handleDelete,
    handleSelect,
    add,
    text
  ) => {
    type = this.state[`${type}`];
    return (
      <div>
        <div>
          {type.map((item, i) => {
            return (
              <div key={i}>
                <QuizComponent
                  selectedItem={selectedItem}
                  pos={i}
                  leadsTo={item.val}
                  handleDelete={handleDelete}
                  onSelect={handleSelect}
                  text={item.description ? item.description : item}
                />
              </div>
            );
          })}
        </div>
        <div>
          <NewQuizComponent
            handleAdd={add}
            text={text}
            questionNum={this.state.selectedQuestion}
          />
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className="container">
        <div className="quiz-title">
          <div>
            <h2>
              {this.state.quizName.replace(/\w\S*/g, function (txt) {
                return (
                  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                ); //thank you stack overflow
              })}
            </h2>
          </div>
          <div>
            <label htmlFor="quizName">First Give your quiz a name!</label>
            <br />
            <input
              type="text"
              id="quizName"
              onChange={(e) => this.updateQuizName(e.target.value)}
            />
            <br />
          </div>
        </div>

        <div>
          <div className="createPage">
            <div>
              {this.randerColumn(
                "questions",
                this.state.selectedQuestion,
                this.deleteQuestion,
                this.selectQuestion,
                this.addQuestion,
                "add new question",
                `new answer for question #${this.state.selectedQuestion + 1}`
              )}
            </div>

            <div className="middle-column">
              {this.state.selectedQuestion >= 0
                ? this.randerColumn(
                    "activeAnswers",
                    this.state.selectedAnswer,
                    this.deleteAnswer,
                    this.selectAnswer,
                    this.addAnswer
                  )
                : ""}
            </div>

            <div>
              {this.randerColumn(
                "results",
                this.state.selectedResult,
                this.deleteResult,
                this.selectResult,
                this.addResult,
                "add new result"
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewQuizPage;
