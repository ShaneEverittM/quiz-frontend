import React from "react";
import { Prompt } from "react-router-dom";
import NewQuizComponent from "../components/NewQuizComponent";
import QuizComponent from "../components/QuizComponent";
import NewQuizTitle from "../components/NewQuizTitle";
import { submitQuiz } from "../api/api.js";
import "./NewQuizPage.css";
//TODO refactor into smaller components

class NewQuizPage extends React.Component {
  state = {
    questions: [],
    quizHeader: {},
    answers: [[]],
    activeAnswers: [],
    results: [],
    selectedQuestion: -1,
    selectedAnswer: -1,
    selectedResult: -1,
    msg: "",
    error: false,
  };

  updateQuizName = (quizHeader) => {
    this.setState({ quizHeader });
  };

  inProgress = () => {
    return this.state.questions.length || this.state.results.length;
  };

  addResult = (description, header) => {
    let { results } = this.state;
    results = [...results, { description, header }];
    this.setState({ results });
  };

  addQuestion = (questionText) => {
    this.setState({
      questions: [...this.state.questions, { description: questionText }],
    });
  };

  addAnswer = (answerText) => {
    let questionNum = this.state.selectedQuestion;
    let ans = { description: answerText, val: null };
    let { answers } = this.state;
    if (!answers[questionNum]) answers[questionNum] = [];
    answers[questionNum] = [...answers[questionNum], ans];
    this.setState({ answers });
    this.selectQuestion(questionNum);
  };

  selectQuestion = (selected) => {
    this.setState({
      selectedQuestion: selected,
      selectedAnswer: 0,
      activeAnswers: this.state.answers[selected]
        ? this.state.answers[selected]
        : [],
    });
  };
  selectAnswer = (selected) => {
    this.setState({ selectedAnswer: selected, selectedResult: -1 });
  };
  selectResult = (selected) => {
    this.setState({ selectedResult: selected });
    if (
      this.state.answers[this.state.selectedQuestion] &&
      this.state.answers[this.state.selectedQuestion][this.state.selectedAnswer]
    )
      this.matchResultsToAnswers(selected);
  };
  matchResultsToAnswers = (i) => {
    let { answers } = this.state;
    answers[this.state.selectedQuestion][this.state.selectedAnswer].val = i;
    this.setState({ answers });
  };

  onUnload = (e) => {
    if (this.inProgress) {
      e.preventDefault();
      e.returnValue = "You will lose your progress if you leave now!";
    }
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
    let { questions, answers, selectedQuestion } = this.state;
    questions.splice(i, 1);
    answers.splice(i, 1);
    selectedQuestion = -1;
    console.log(" im delete. selectedQuestion: ", selectedQuestion);

    this.setState({
      questions,
      answers,
      activeAnswers: this.state.answers[0],
      selectedQuestion,
      selectedAnswer: 0,
    });
  };

  editQuestion = (newQuestion) => {
    let { questions } = this.state;
    questions[this.state.selectedQuestion] = { description: newQuestion };
    this.setState({ questions });
  };
  editAnswer = (newAnswer) => {
    let { answers } = this.state;
    answers[this.state.selectedQuestion][this.state.selectedAnswer] = {
      description: newAnswer,
    };
    this.setState({
      answers,
      activeAnswers: answers[this.state.selectedAnswer],
    });
  };
  editResult = (description, header) => {
    let { results } = this.state;
    results[this.state.selectedResult] = { description, header };
    this.setState({ results });
  };

  renderColumn = (
    type,
    selectedItem,
    handleDelete,
    handleSelect,
    add,
    text,
    edit
  ) => {
    let toDisplay = this.state[`${type}`];
    return (
      <div>
        <div>
          {toDisplay.map((item, i) => {
            return (
              <div key={i}>
                <QuizComponent
                  selectedItem={selectedItem}
                  pos={i}
                  leadsTo={item.val}
                  handleDelete={handleDelete}
                  onSelect={handleSelect}
                  text={item}
                  handleEdit={edit}
                  type={type}
                />
              </div>
            );
          })}
        </div>
        <>
          <NewQuizComponent
            handleAdd={add}
            text={text}
            type={type}
            buttonText="Add"
          />
        </>
      </div>
    );
  };

  packData = () => {
    return {
      quiz: this.state.quizHeader,
      questions: this.state.questions,
      answers: this.state.answers,
      results: this.state.results,
    };
  };
  validate = (info) => {
    let errorCode = 0;

    if (!info.questions.length) errorCode = 1;
    for (let subar of info.answers) {
      for (let obj of subar) if (obj.val === null) errorCode |= 2; // check answers are matched
      if (!subar.length) errorCode |= 4;
    }
    for (let result of info.results) {
      if (result.header == null || result.description == null) errorCode |= 16;
    }
    if (!info.quiz.name || !info.quiz.description) errorCode |= 8;

    return errorCode;
  };

  setErrorMsg = (errorCode) => {
    let msg = "";
    if (errorCode & 1) msg += "@No listed answers";
    errorCode >>= 1;
    if (errorCode & 1) msg += "@There are unmatched answers";
    errorCode >>= 1;
    if (errorCode & 1) msg += "@No answers listed\n";
    errorCode >>= 1;
    if (errorCode & 1) msg += "@Error in quizname or description";
    errorCode >>= 1;
    if (errorCode & 1) msg += "@Error in result title or description";
    this.setState({ msg, error: true });
  };

  submit = () => {
    let dataToSend = this.packData();
    let errorStatus = this.validate(dataToSend);
    if (errorStatus === 0) {
      this.setState({ error: false });
      submitQuiz(dataToSend);
      this.setState({
        questions: [],
        quizHeader: {},
        answers: [[]],
        activeAnswers: [],
        results: [],
        selectedQuestion: -1,
        selectedAnswer: -1,
        selectedResult: -1,
      });
      this.setState({ msg: "Success!" });
    } else {
      this.setErrorMsg(errorStatus);
    }
  };

  renderMsg = () => {
    return (
      <div>
        {this.state.msg ? (
          <div className={`${this.state.msg[0] === "@" ? "error" : "success"}`}>
            {this.state.msg.split("@").map((item, i) => {
              return <div key={i}> {item}</div>;
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };
  render() {
    return (
      <div className="container">
        <Prompt
          when={Boolean(this.inProgress())}
          message="You'll lose your progress if you leave now!"
        />
        <NewQuizTitle
          quizHeader={this.state.quizHeader}
          updateName={this.updateQuizName}
        />

        <div>
          <div className="createPage">
            <div>
              {this.renderColumn(
                "questions",
                this.state.selectedQuestion,
                this.deleteQuestion,
                this.selectQuestion,
                this.addQuestion,
                "Add New Question",
                this.editQuestion
              )}
            </div>

            <div className="middle-column">
              {console.log(this.state.selectedQuestion)}
              {this.state.selectedQuestion >= 0
                ? this.renderColumn(
                    "activeAnswers",
                    this.state.selectedAnswer,
                    this.deleteAnswer,
                    this.selectAnswer,
                    this.addAnswer,
                    `New Answer for Question #${
                      this.state.selectedQuestion + 1
                    }`,
                    this.editAnswer
                  )
                : "Add/Select a Question to Start Adding Answers"}
            </div>

            <div>
              {this.renderColumn(
                "results",
                this.state.selectedResult,
                this.deleteResult,
                this.selectResult,
                this.addResult,
                "Description",
                this.editResult
              )}
            </div>
          </div>
        </div>
        <button
          className=" main-submit submit-button "
          onClick={() => {
            this.submit();
          }}
        >
          Submit
        </button>

        {this.renderMsg()}
        <div className="tips">
          <div style={{ textAlign: "center" }}>Tips</div>
          <span role="img" aria-label="trash" className="container-item">
            ❗ - means there are unmatched answers
          </span>
          <div>
            While quizzes can be flexible, we suggest one answer for each result
            to ensure a well formed quiz.
          </div>
          <div>
            A good result description explains what the title means and why it
            matches with the answers.
          </div>
        </div>
      </div>
    );
  }
}

export default NewQuizPage;
