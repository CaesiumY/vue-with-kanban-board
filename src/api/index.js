import axios from "axios";
import router from "../router";

const DEFAULT_DOMAIN = "http://localhost:3000";
const UNAUTHORIZED_CODE = 401;

const redirectLogin = () => {
  router.push("/login");
};

const request = (method, url, data) => {
  return axios({
    method,
    url: DEFAULT_DOMAIN + url,
    data
  })
    .then(res => res.data)
    .catch(e => {
      const { status } = e.response;
      if (status === UNAUTHORIZED_CODE) return redirectLogin();
      throw Error(e);
    });
};

export const board = {
  fetch() {
    return request("get", "/boards");
  }
};
