import { useMutation } from "react-query";
import api from "../../core/api";
import cookie from "cookie";
import { useRouter } from "next/router";

interface LoginData {
  cpf: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();
  return useMutation((payload: LoginData) => api.post("/auth/login", payload), {
    onSuccess: ({ data }: { data: { access_token: string } }) => {
      document.cookie = cookie.serialize("_jwt", data.access_token);
      router.push("/dashboard");
    },
  });
};
