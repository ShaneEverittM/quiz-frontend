import Cookies from "js-cookie";

const checkLogin = () => {
  return Cookies.get("token");
};

export { checkLogin };
