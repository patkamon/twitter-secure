import NextAuth, { Account, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";


export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "tavitter-login",
      name: "Tavitter",
      credentials: {},
      async authorize(credentials, req) {
        let data = {
          email: req.body?.email,
          password: req.body?.password,
        };
        try {
          const response = await axios.post(
            "http://twitter-secure-nginx-proxy-1:80/user/login",
            data
          );
          if (response.data.status) {
            throw new Error(response.data.msg);
          }
          return response.data;
        } catch (error) {
          throw new Error("invalid username or password");
        }
      },
    }),
    CredentialsProvider({
      id: "tavitter-signup",
      name: "Tavitter",
      credentials: {},
      async authorize(credentials, req) {
        let data = {
          username: req.body?.username,
          email: req.body?.email,
          password: req.body?.password,
          phone: req.body?.phone,
          role: 'user',
        };
        try {
          const response = await axios.post(
            "http://twitter-secure-nginx-proxy-1:80/user/signup",
            data
          );
          if (response.data.status) {
            throw new Error(response.data.msg);
          }
          return response.data;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      },
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;
      session.user.csrf = token.csrf;
      return session;
    },
    async jwt({token, user, account}) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.token;
        token.csrf = user.csrf;
      }
      if (account?.provider == "github") {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
