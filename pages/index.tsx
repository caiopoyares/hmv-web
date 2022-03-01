import { isBrowser } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { isAuthenticated } from "../helpers/auth";
import { Home } from "../modules/home";

const HomePage: NextPage = () => {
  const router = useRouter();
  if (!isBrowser) return null;
  if (isAuthenticated()) router.push("/dashboard");

  return (
    <div>
      <Head>
        <title>Home - HMV</title>
        <meta name="description" content="Página inicial" />
      </Head>
      <Home />
    </div>
  );
};

export default HomePage;
