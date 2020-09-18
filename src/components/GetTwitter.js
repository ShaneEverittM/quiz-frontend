import React, { useState } from "react";
import { getTweets } from "../api/api";

let GetTwitter = ({ setTweets }) => {
  let [screenName1, setName1] = useState("");
  let [screenName2, setName2] = useState("");
  let [receivedTweets, setReceived] = useState(false);
  let [numTweets, setNum] = useState(0);
  const submit = async () => {
    let { data } = await getTweets(screenName1, screenName2);
    if (data.questions) {
      setNum(data.questions.length);

      setTweets(data);
    }
    setReceived(true);
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
      <div>
        {receivedTweets
          ? numTweets < 10
            ? `10 tweets were requested from Twitter, they sent ${numTweets}. IDK man twitter APIs are weird.`
            : "Tweets received!"
          : ""}
      </div>
    </div>
  );
};

export default GetTwitter;
