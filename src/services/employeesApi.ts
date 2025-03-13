import Axios from "axios";

const employeesApi = Axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  timeout: 15000,
});

export default employeesApi;
