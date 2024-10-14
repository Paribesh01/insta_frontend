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
      return { success: true }
    } catch (e: any) {
      const axiosError = e as AxiosError;
      if (axiosError.response) {
        // You can handle error based on response status or error message
        console.error(axiosError.response.data);
        return (axiosError.response.data)
      } else {
        console.error("Network or server error occurred.");
        return ("Network or server error occurred.")
      }
    }
  };

  return { signup };
}
