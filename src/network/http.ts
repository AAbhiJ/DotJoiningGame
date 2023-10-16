import axios from "axios";
const authTokenEnv = import.meta.env.VITE_REACT_APP_AUTH_TOKEN;
const baseUrlEnv = import.meta.env.VITE_REACT_APP_BASE_URL;

// axios.defaults.headers.common.accept = "application/json";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.baseURL = baseUrlEnv;

const addLoginHeaders = (config: any) => {
  let authToken = authTokenEnv;
  if (authToken && authToken.length > 0) {
    config.headers["Authorization"] = `Bearer ${authToken}`;
  }
  return config;
};

axios.interceptors.request.use(
  function (config: any) {
    config = addLoginHeaders(config);
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: any) => {
    return response;
  },
  function (error: any) {
    if (
      error?.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      let temp = 1;
    }
    //something with error
    return Promise.reject(error);
  }
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
