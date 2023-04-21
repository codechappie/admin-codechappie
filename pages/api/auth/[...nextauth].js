import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user',
      profile: (profile, oAuthProfile) => {
        return {
          id: profile.id,
          name: profile.real_name,
          email: profile.default_email,
          image: {
            ...profile
          },
        };
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/login',
  },
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     console.log({ user, account, profile, email, credentials })
  //     debugger
  //     return true
  //   },
  // },
  //   signOut: '/register',
  //   error: '/login', // Error code passed in query string as ?error=
  //   verifyRequest: '/login', // (used for check email message)
  //   newUser: '/login' // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  
}
export default NextAuth(authOptions)

