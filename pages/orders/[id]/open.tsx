import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { MainLayout } from "../../../components/mainLayout";
import { isBrowser } from "../../../helpers";
import { isAuthenticated } from "../../../helpers/auth";
import { OpenOrder } from "../../../modules/orders/OpenOrder";

const OpenOrderPage = () => {
  const router = useRouter();

  if (!isBrowser) return null;
  if (!isAuthenticated()) router.push("/");

  return (
    <MainLayout>
      <Head>
        <title>Nova ficha de emergência - HMV</title>
        <meta name="description" content="Nova ficha - HMV" />
      </Head>
      <OpenOrder orderId={router.query.id as string} />
    </MainLayout>
  );
};

export default OpenOrderPage;
