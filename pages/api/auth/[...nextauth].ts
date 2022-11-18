import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: "842793370402499",
      clientSecret: "10f3c13852a7daee203b21603be484f7",
    }),
    // ...add more providers here
  ],
  secret: "secretlol",
  pages: {
    signIn: "/auth/signin",
  },
}
export default NextAuth(authOptions)
