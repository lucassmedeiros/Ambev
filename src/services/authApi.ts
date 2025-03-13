import Axios from "axios";

const authApi = Axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default authApi;
