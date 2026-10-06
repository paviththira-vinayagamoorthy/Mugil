import axios from "axios";

const api = axios.create({
  baseURL: "https://mugil-production-89eb.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;