import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 429)
      toast.error("Too many requests! Slow down.");
    return Promise.reject(error);
  }
);

export default api;
