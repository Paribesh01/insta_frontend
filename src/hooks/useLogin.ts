import { axiosClient } from "@/lib/axiosconfig";
import { AxiosError, AxiosResponse } from "axios";

export function useLogin() {
  const login = async (username: string, password: string) => {
    try {
      console.log(import.meta.env.BASE_URL);
      const response: AxiosResponse = await axiosClient.post("auth/login", {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
    } catch (e: any) {
      const axiosError = e as AxiosError;
      if (axiosError.response) {
        // You can handle error based on response status or error message
        console.error(axiosError.response.data);
      } else {
        console.error("Network or server error occurred.");
      }
    }
  };

  return { login };
}