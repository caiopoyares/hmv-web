import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { MainLayout } from "../../../components/mainLayout";
import { isBrowser } from "../../../helpers";
import { isAuthenticated } from "../../../helpers/auth";

const ClosedOrderPage = () => {
  const router = useRouter();
  if (!isBrowser) return null;
  if (!isAuthenticated()) router.push("/");

  console.log(router.query.id);

  return (
    <MainLayout>
      <Head>
        <title>Nova ficha de emergência - HMV</title>
        <meta name="description" content="Nova ficha - HMV" />
      </Head>
      closed
      {/* <NewOrder /> */}
    </MainLayout>
  );
};

export default ClosedOrderPage;
