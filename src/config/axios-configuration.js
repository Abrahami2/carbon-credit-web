import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const SetAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

const AxiosBaseUrl = () => {
  axios.defaults.baseURL = REACT_APP_API_URL;
  return axios;
};

export {
  SetAuthToken,
  AxiosBaseUrl
};
