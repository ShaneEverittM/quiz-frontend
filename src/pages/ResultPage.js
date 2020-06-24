import React from "react";

/* TODO
  given user responses and quiz results do some thing
*/
const ResultPage = (props) => {
  console.log("props: ", props);

  const computeResults = () => {
    console.log(props.location.state.results);
  };

  return (
    <div>
      {computeResults()}
      haha results go
      <marquee>Brrrrrr</marquee>
    </div>
  );
};

export default ResultPage;
