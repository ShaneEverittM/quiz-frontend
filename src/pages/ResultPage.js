import React from "react";
import "./ResultPage.css";
const ResultPage = (props) => {
  const computeResults = () => {
    let possibleResults = props.location.state.results;

    let responses = props.location.state.responses;
    let computer = new Array(possibleResults.length).fill(0);

    let mode = 0;

    for (let answer of responses) {
      computer[answer]++;
      if (computer[answer] > mode) mode = answer;
    }

    return (
      <div className="result-card">
        <div className="result-info shadow">
          <div className="header ">{possibleResults[mode].header}</div>
          <>{possibleResults[mode].description}</>
        </div>
      </div>
    );
  };

  return <div>{computeResults()}</div>;
};

export default ResultPage;
