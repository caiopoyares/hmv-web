import cookie from "cookie";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export const getAuthToken = (
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const stringfiedCookies =
    typeof window !== "undefined"
      ? document && document.cookie
      : (ctx && ctx.req && ctx.req.headers.cookie) || "";

  const { _jwt: jwtToken } = cookie.parse(stringfiedCookies);

  if (!jwtToken) return null;

  return `Bearer ${jwtToken}`;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
