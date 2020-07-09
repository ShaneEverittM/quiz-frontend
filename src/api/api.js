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
    return [];
  }
};

const getQuizPreviews = async () => {
  try {
    let res = await axios.get(`${serverURL}`);
    return res;
  } catch (e) {
    console.log("error: ", e);
    return [];
  }
};

export { getQuizPreviews, getQuiz, submitQuiz };
