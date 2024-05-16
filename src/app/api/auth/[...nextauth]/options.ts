import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { session } from "@/lib/session";
import clientPromise from "@/lib/db";
export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        const user = {
          id: "",
          name: "",
          email: "",
          password: "",
          image: "",
        };
        const username = req.body?.username;
        const password = req.body?.password;
        const client = await clientPromise;
        const db = client.db("test");
        const userExist = await db
          .collection("jeera")
          .findOne({ email: username });
        if (userExist) {
          if (
            userExist.password === password &&
            userExist.email === username
          ) {
            user.name = userExist?.name;
            user.email = userExist?.email;
            user.image = userExist?.image;
            return user;
          } else {
            throw new Error("credentials not found");
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        if (!profile?.email) {
          throw new Error("No profile");
        }
        const client = await clientPromise;
        const db = client.db("test");
        const userExist = await db.collection("jeera").find({ id: user.id });
        if (userExist) {
          const result = await db.collection("jeera").insertOne(user);
          if (result.acknowledged === true) {
            return true;
          } else throw new Error("Can't create a profile");
        } else return false;
      }
      return true;
    },
    session,
    async jwt({ token, user, account, profile }) {
      if (profile) {
        console.log("token: ", token);
      }
      return token;
    },
  },
};
