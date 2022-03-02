import { isBrowser } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { isAuthenticated } from "../helpers/auth";
import { SignUp } from "../modules/signup";

const SignUpPage: NextPage = () => {
  const router = useRouter();
  if (!isBrowser) return null;
  if (isAuthenticated()) router.push("/dashboard");

  return (
    <div>
      <Head>
        <title>Login - HMV</title>
        <meta name="description" content="Página de login" />
      </Head>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
