import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { MainLayout } from "../../../components/mainLayout";
import { isBrowser } from "../../../helpers";
import { isAuthenticated } from "../../../helpers/auth";
import { ClosedOrder } from "../../../modules/orders/ClosedOrder";

const ClosedOrderPage = () => {
  const router = useRouter();
  if (!isBrowser) return null;
  if (!isAuthenticated()) router.push("/");

  return (
    <MainLayout>
      <Head>
        <title>Finalizar ficha de emergência - HMV</title>
        <meta name="description" content="Nova ficha - HMV" />
      </Head>
      <ClosedOrder orderId={router.query.id as string} />
    </MainLayout>
  );
};

export default ClosedOrderPage;
