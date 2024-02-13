import axios from "axios";

const BASE_URL = "http://localhost:3003";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Content-Type": "application/json",
  },
});
