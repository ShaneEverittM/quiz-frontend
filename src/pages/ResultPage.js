import React from "react";

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
      <div style={{ marginTop: "80px" }}>
        <h1>{possibleResults[mode].header}</h1>
        <h4>{possibleResults[mode].description}</h4>
      </div>
    );
  };

  return <div>{computeResults()}</div>;
};

export default ResultPage;
