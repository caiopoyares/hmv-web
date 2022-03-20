import { useMutation } from "react-query";
import api from "../../core/api";
import cookie from "cookie";
import { useRouter } from "next/router";

export const useLogin = () => {
  const router = useRouter();
  return useMutation((payload: any) => api.post("/auth/login", payload), {
    onSuccess: ({ data }: any) => {
      document.cookie = cookie.serialize("_jwt", data.access_token);
      router.push("/dashboard");
    },
  });
};
