import React from "react";
import "./ResultPage.css";
const ResultPage = (props) => {
  const computeResults = () => {
    let possibleResults = props.location.state.results;
    console.log("possibleResults: ", possibleResults);

    let responses = props.location.state.responses;
    console.log("responses: ", responses);
    let computer = new Array(possibleResults.length).fill(0);

    for (let answer of responses) {
      computer[answer]++;
    }
    let mode = computer.reduce(
      (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
      0
    );
    console.log("mode: ", mode);
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
