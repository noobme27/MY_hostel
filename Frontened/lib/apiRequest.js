import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://backened-7u3h.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
