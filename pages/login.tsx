import { isBrowser } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { isAuthenticated } from "../helpers/auth";
import { Login } from "../modules/login";

const LoginPage: NextPage = () => {
  const router = useRouter();
  if (!isBrowser) return null;
  if (isAuthenticated()) router.push("/dashboard");

  return (
    <div>
      <Head>
        <title>Login - HMV</title>
        <meta name="description" content="Página de login" />
      </Head>
      <Login />
    </div>
  );
};

export default LoginPage;
