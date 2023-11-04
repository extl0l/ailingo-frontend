import axios from "axios";

export const backendClient = axios.create({
  baseURL: "https://ailingo-backend.azurewebsites.net/",
});
