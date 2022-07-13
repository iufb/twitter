import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
        <SessionProvider session={session}>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </SessionProvider>
    </>
  );
}
