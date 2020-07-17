import React, { useState } from "react";
import { getTweets } from "../api/api";

let GetTwitter = ({ setTweets }) => {
  let [screenName1, setName1] = useState("");
  let [screenName2, setName2] = useState("");
  const submit = async () => {
    let { data } = await getTweets(screenName1, screenName2);
    console.log("in submit. data: ", data);
    // setName1("");
    // setName2("");
    setTweets(data);
  };
  return (
    <div>
      <input
        type="text"
        value={screenName1}
        onChange={(e) => setName1(e.target.value)}
      />{" "}
      vs.{" "}
      <input
        type="text"
        value={screenName2}
        onChange={(e) => setName2(e.target.value)}
      />
      <button onClick={submit}>Get Tweets</button>
    </div>
  );
};

export default GetTwitter;
