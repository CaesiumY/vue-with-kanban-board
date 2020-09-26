import axios from "axios";
import router from "../router";

const DEFAULT_DOMAIN = "http://localhost:3000";
const UNAUTHORIZED_CODE = 401;
export const AUTH_TOKEN = "AUTH_TOKEN";

const redirectLogin = () => {
  router.push(`/login?rPath=${encodeURI(location.pathname)}`).catch(() => {}); // 같은 경로로 리다이렉트시 경고문 제거
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
      if (status === UNAUTHORIZED_CODE) redirectLogin();
      throw e.response;
    });
};

export const setAuthInHeader = token => {
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : null;
};

const localAuthToken = localStorage.getItem(AUTH_TOKEN);
if (localAuthToken) setAuthInHeader(localAuthToken);

export const board = {
  fetch() {
    return request("get", "/boards");
  }
};

export const auth = {
  login(email, password) {
    return request("post", "/login", { email, password });
  }
};
