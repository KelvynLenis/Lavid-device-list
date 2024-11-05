import axios from "axios";

export const api = axios.create({
  baseURL: "https://apiphonestream-production.up.railway.app",
});