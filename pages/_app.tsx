import Layout from "@/components/Layout";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { Router, useRouter } from 'next/dist/client/router';
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import { useEffect, useState } from "react";
import "../styles/globals.scss";
import axios from "axios";

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

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
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
  // let router = useRouter();
  const [allowed, setallowed] = useState(false);
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const data: any = useSession({ required: true });
  let { status }: any = data;
  // useEffect(() => {
  //   if (data.data?.user) {
  //     axios
  //       .get("/api/user", {
  //         params: {
  //           email: data.data.user.image.email,
  //         },
  //       })
  //       .then(({ data }) => {
  //         console.log(data.userExists);
  //         if (data.userExists) {
  //           // setallowed(true);
  //         } else {
  //           console.log("push login")
  //           router.push("/login")
  //           // setallowed(false);
  //         }
  //       });
  //   }
  // }, [status]);

  // console.log(allowed)
  // if (allowed == false) {
  //   signOut();
  //     // window.location.href="/login";
  // }

  // if (data.data?.user) {
  //   Promise.all([
  //     axios.get("/api/user", {
  //       params: {
  //         email: data.data.user.image.email,
  //       },
  //     }),
  //   ]).then(function ({ data }) {
  //     console.log(data.userExists);
  //     if (data.userExists) {
  //       router.push("/new/url");
  //     }
  //   });
  // }

  console.log("as", status);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
export default MyApp;
