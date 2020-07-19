import React, { useState } from "react";
import { getTweets } from "../api/api";

let GetTwitter = ({ setTweets }) => {
  let [screenName1, setName1] = useState("");
  let [screenName2, setName2] = useState("");
  let [receivedTweets, setReceived] = useState(false);
  let [numTweets, setNum] = useState(0);
  const submit = async () => {
    let { data } = await getTweets(screenName1, screenName2);
    setNum(data.questions.length);
    console.log("in submit. data: ", data);
    // setName1("");
    // setName2("");
    setReceived(true);
    setTweets(data);
  };
  return (
    <div>
      <div>
        {receivedTweets && numTweets < 10
          ? `10 tweets were requested from Twitter, they sent ${numTweets}. IDK man twitter APIs are weird.`
          : ""}
      </div>
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
