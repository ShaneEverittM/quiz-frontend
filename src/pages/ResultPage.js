import React from "react";

/* TODO
  given user responses and quiz results do some thing
*/
const ResultPage = (props) => {
  const computeResults = () => {
    let possibleResults = props.location.state.results;
    console.log("possibleResults: ", possibleResults);

    let responses = props.location.state.responses;
    let computer = new Array(possibleResults.length).fill(0);

    let mode = 0;

    for (let answer of responses) {
      computer[answer]++;
      if (computer[answer] > mode) mode = answer;
    }
    console.log("mode: ", mode);
    console.log("computer: ", computer);
    return (
      <div>
        <h1>{possibleResults[mode].resultHeader}</h1>
        <h4>{possibleResults[mode].description}</h4>
      </div>
    );
  };

  return <div>{computeResults()}</div>;
};

export default ResultPage;
