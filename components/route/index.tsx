import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// interface Props {
//   children: JSX.Element;
//   session: any;
// }

export default function Route({ session }: any) {
  const router = useRouter();

  //   const { data: session }: any = useSession();
  console.log("SES", session);

  useEffect(() => {
    if (!session) {
      router.push("/", undefined);
    }
  }, []);

  return (
    <>
      <main className="sd">
        <h1>AsAsas</h1>
        {/* {session ? (
          <>{children}</>
        ) : (
          <>
            <h1>Login</h1>
            <button>Login</button>
          </>
        )} */}
      </main>
    </>
  );
}

