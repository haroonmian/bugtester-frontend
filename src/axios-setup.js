import axios from "axios";

let baseURL = process.env.BASE_URL || "http://localhost:3500/";

let Axios;

const init = () => {
  Axios = axios.create({
    baseURL: baseURL,
    timeout: 60000,
  });
  Axios.interceptors.request.use(handleSuccessRequest, handleErrorRequest);
  Axios.interceptors.response.use(handleSuccess, handleError);
};

const handleSuccessRequest = (request) => {
  if (JSON.parse(localStorage.getItem("bugtester_auth"))?.token)
    request.headers["auth-token"] = `${JSON.parse(localStorage.getItem("bugtester_auth"))?.token}`;
  return request;
};

const handleErrorRequest = (error) => {
  return Promise.reject(error);
};

const handleSuccess = (response) => {
  return response;
};

const handleError = (error) => {
  return Promise.reject(error.response);
};

init();

export default Axios;