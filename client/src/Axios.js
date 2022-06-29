import axios from "axios";

const Axios = axios.create({
  baseURL: "http://192.168.100.2:3000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  },
  withCredentials: true,
});

export default Axios;
