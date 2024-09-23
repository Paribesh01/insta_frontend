import { axiosClient } from "@/lib/axiosconfig";
import { AxiosError, AxiosResponse } from "axios";

export function useSignup() {
  const signup = async (username: string, password: string, email: string) => {
    try {
      const response: AxiosResponse = await axiosClient.post("/auth/signup", {
        username: username,
        email: email,
        password: password,
      });

      if (response.data.message) {
        console.log(response.data.message);
      }
    } catch (e: any) {
      const axiosError = e as AxiosError;
      if (axiosError.response) {
        console.error(axiosError.response.data);
      } else {
        console.error("Network or server error occurred.");
      }
    }
  };

  return { signup };
}
