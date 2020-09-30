import axios from "axios";

import Cookies from "js-cookie";
const serverURL = "http://localhost:8000";
const tweetURL = "http://localhost:3001";

const axiosWithCookies = axios.create({ withCredentials: true });

const submitQuiz = async (data) => {
  try {
    let res = await axios.post(`${serverURL}/quiz`, data);
    return res;
  } catch (e) {
    console.log("error: ", e);
  }
};

const getUserQuizzes = async (user_id) => {
  try {
    let res = await axiosWithCookies.get(
      `${serverURL}/quizzes?user_id=${user_id}`
    );

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

const register = async (username, password) => {
  let data = { name: "anthony", email: username, password };
  try {
    let res = await axios.post(`${serverURL}/users/create`, data);
    return res;
  } catch (e) {
    console.log("error: ", e);
    return { data: [] };
  }
};

const deleteQuiz = async (q_id, u_id) => {
  try {
    let res = await axiosWithCookies.delete(
      `${serverURL}/quiz?quiz_id=${q_id}&user_id=${u_id}`
    );
    return res;
  } catch (e) {
    console.log("error: ", e);
    return { data: [] };
  }
};

const checkLogin = async (id) => {
  try {
    let res = await axiosWithCookies.get(`${serverURL}/users/cookies/${id}`);
    return res;
  } catch (e) {
    console.log("error: ", e);
    return { data: [] };
  }
};

const login = async (username, password) => {
  let data = { username, password };
  try {
    let res = await axiosWithCookies.post(`${serverURL}/users/login`, data);
    return res.data;
  } catch (e) {
    console.log("error: ", e);
    return { data: [] };
  }
};

const logout = async () => {
  try {
    let res = await axiosWithCookies.post(`${serverURL}/users/logout`, {
      1: 1,
    });

    return res;
  } catch (e) {
    console.log("error: ", e);
    return { data: [] };
  }
};
const getTweets = async (name1, name2) => {
  try {
    let res = await axios.get(`${tweetURL}/tweets/${name1}/${name2}`);
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

export {
  search,
  getBrowse,
  getQuizPreviews,
  getQuiz,
  submitQuiz,
  getTweets,
  register,
  login,
  checkLogin,
  logout,
  getUserQuizzes,
  deleteQuiz,
};
