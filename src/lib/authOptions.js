import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDb } from "./connectToDb";
import { User } from "./modals";

import NextAuth from "next-auth"

export const authOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          img: profile.avatar_url,
          username: profile.login,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          connectToDb();
          const user = await User.findOne({ email: credentials?.email });
          if (!user) return null;

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) return null;

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github" || account.provider === "google") {
        connectToDb();
        try {
          const foundUser = await User.findOne({ email: profile?.email });
          if (!foundUser && profile?.email) {
            const newUser = new User({
              username: profile?.login || profile?.given_name,
              name: user.name,
              email: profile.email,
              img: user.image,
            });
            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.username = user.username;
        token.img = user.img || user.image || "/images/user.png";
        token.provider = account?.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session?.user.id = token.id;
      session?.user.username = token.username;
      session?.user.isAdmin = token.isAdmin;
      session?.user.img = token.img;
      session.provider = token.provider;
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnUserPages = request.nextUrl?.pathname.startsWith(
        `/${user?.username}`
      );
      const isOnUnauthPages =
        request.nextUrl?.pathname.startsWith("/login") ||
        request.nextUrl?.pathname.startsWith("/register");

      // ONLY ADMIN CAN ACCESS ADMIN DASHBOARD
      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      // ONLY AUTH USER CAN ACCESS USER PAGES
      if (isOnUserPages && !user) {
        return false;
      }

      // ONLY NOT AUTH USER CAN ACCESS THE LOGIN OR REGISTER
      if (isOnUnauthPages && user) {
        console.log(new URL("/", request.nextUrl.toString()));
        return Response.redirect(new URL("/", request.nextUrl.toString()));
      }

      return true;
    },
  },

  secret: process.env.AUTH_SECRET || "any random string",
};

export default NextAuth(authOptions)