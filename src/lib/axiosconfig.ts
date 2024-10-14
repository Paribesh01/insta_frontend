import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
});
export function setAxiosHeader(token: string) {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}