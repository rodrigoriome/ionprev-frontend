import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`
});

export default api;
