import { useRouter } from "next/router";
import React from "react";
import { isBrowser } from "../helpers";
import { isAuthenticated } from "../helpers/auth";

const DashboardPage = () => {
  const router = useRouter();
  if (!isBrowser) return null;
  if (!isAuthenticated()) router.push("/");

  return <div></div>;
};

export default DashboardPage;
