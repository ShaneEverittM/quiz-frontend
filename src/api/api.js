import axios from "axios";
const serverURL = "http://localhost:8000";

const submitQuiz = async (data) => {
  console.log("data: ", data);
  try {
    let res = await axios.post(`${serverURL}/quiz`, data);
    console.log(res);
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
  console.log("term: ", term);
  try {
    let res = await axios.get(`${serverURL}/search/${term}`);
    return res;
  } catch (e) {
    console.log("error: ", e);
    return { data: [] };
  }
};

export { search, getBrowse, getQuizPreviews, getQuiz, submitQuiz };
