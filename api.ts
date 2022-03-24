import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.106:5000",
  responseType: "json",
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const status = error.response?.status || 500;
    if (status === 403) {
      console.log("need refresh");
      const res = await instance.get(originalRequest.url)
      return res
    }
    return Promise.reject(error);
  }
);

export default instance;
