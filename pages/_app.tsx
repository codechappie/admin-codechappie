import Layout from "@/components/Layout";
import { SessionProvider, useSession } from "next-auth/react";
import { Router } from "next/dist/client/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import { useEffect } from "react";
import "../styles/globals.scss";

require("prismjs/components/prism-javascript");
require("prismjs/components/prism-css");
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-python");

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

function MyApp({ Component, pageProps: { session, ...pageProps } }:any) {
  useEffect(() => {
    const highlight = () => {
      Prism.highlightAll();
    };
    setTimeout(() => {
      highlight();
    }, 1);
  }, []);
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </SessionProvider>
  );
}

function Auth({ children }: any) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const data= useSession({ required: true });
  let { status } = data;
  console.log(data);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
export default MyApp;
