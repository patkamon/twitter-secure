import NextAuth from "next-auth"

declare module "next-auth" {

  interface Session {
    user: {
      id: string
      accessToken: string
      name?: string;
      image?: string;
    }
  }
}