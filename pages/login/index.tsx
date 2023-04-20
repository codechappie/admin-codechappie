import { getCsrfToken, getProviders, getSession, signIn } from "next-auth/react";

function Login({ providers }: any) {
    console.log(providers)
  return (
    <div>
      {Object.values(providers).map((provider: any) => {
        return (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Login;

export async function getServerSideProps(context:any) {
    const { req } = context;
    const session = await getSession({ req });
  
    if (session) {
      return {
        redirect: { destination: "/" },
      };
    }
  
    return {
      props: {
        providers: await getProviders(),
        csrfToken: await getCsrfToken(context),
      },
    };
  }