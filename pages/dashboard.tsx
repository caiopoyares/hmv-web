import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { MainLayout } from "../components/mainLayout";
import { isBrowser } from "../helpers";
import { isAuthenticated } from "../helpers/auth";
import { Dashboard } from "../modules/dashboard";

const DashboardPage = () => {
  const router = useRouter();
  if (!isBrowser) return null;
  if (!isAuthenticated()) router.push("/");

  return (
    <MainLayout>
      <Head>
        <title>Dashboard - HMV</title>
        <meta name="description" content="Dashboard HMV" />
      </Head>
      <Dashboard />
    </MainLayout>
  );
};

export default DashboardPage;
