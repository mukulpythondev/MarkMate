import axios from "axios";

const FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:8000";

export const fastapi = axios.create({
  baseURL: FASTAPI_URL,
  timeout: 10000
});
