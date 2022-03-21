import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.106:5000",
  responseType: "json",
});

instance.interceptors.response.use(
  response => {
    // Do something with response data
    console.log("response succesfull");
    return response;
  },
  error => {
    const originalRequest = error.config;
    const status = error.response?.status || 500;
    // if (status === 403) {
    //   originalRequest._retry = true;
    //   return instance(originalRequest);
    // }
    return Promise.reject(error);
  }
);

export default instance;
