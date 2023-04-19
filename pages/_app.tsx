import "prismjs/themes/prism-okaidia.css";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Router } from "next/dist/client/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Prism from "prismjs";
import { useEffect, useState } from "react";

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

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const highlight = () => {
      Prism.highlightAll();
    };
    setTimeout(() => {
      highlight();
    }, 1);
  }, []);
  return (
    <Layout>
      <Component {...pageProps}/>
    </Layout>
  );
}
export default MyApp;
