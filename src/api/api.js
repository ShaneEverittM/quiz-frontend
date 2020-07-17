import axios from "axios";
const serverURL = "http://localhost:8000";

const submitQuiz = async (data) => {
  try {
    let res = await axios.post(`${serverURL}/quiz`, data);
    return res;
  } catch (e) {
    console.log("error: ", e);
  }
};

const getQuiz = async (id) => {
  try {
    let res = await axios.get(`${serverURL}/quiz/${id}`);

    return res;
  } catch (e) {
    console.log("error: ", e);
    return { data: [] };
  }
};

const getTweets = async (name1, name2) => {
  try {
    let res = await axios.get(
      `http://172.28.58.40:3001/tweets/${name1}/${name2}`
    );
    console.log("res: ", res);
    return res;
  } catch (e) {
    console.log("error: ", e);
    return { data: [] };
  }
};
const getQuizPreviews = async () => {
  try {
    let res = await axios.get(`${serverURL}`);
    return res;
  } catch (e) {
    console.log("error: ", e);
    return { data: [] };
  }
};

const getBrowse = async () => {
  try {
    let res = await axios.get(`${serverURL}/browse`);
    return res;
  } catch (e) {
    console.log("error: ", e);
    return { data: [] };
  }
};

const search = async (term) => {
  try {
    let res = await axios.get(`${serverURL}/search?query=${term}`);
    return res;
  } catch (e) {
    console.log("error: ", e);
    return { data: [] };
  }
};

export { search, getBrowse, getQuizPreviews, getQuiz, submitQuiz, getTweets };
