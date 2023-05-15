import axios from "axios";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

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
  secret: process.env.SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider === 'github') {
        await dbConnect();
        //check the user on your database and return true if is allowed to signIn
        let found = await User.findOne({
          email: user.image.email,
        });
        const isAllowedToSignIn = found
          
        if (isAllowedToSignIn) {
          return true
        } else {
          // Return false to display a default error message
          return false
          // Or you can return a URL to redirect to:
          // return '/unauthorized'
        }
      }
    },

  }

}
export default NextAuth(authOptions)

