import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { connectToDb } from "./connectToDb";
import { User } from "./modals";
import { authConfig } from "./auth.config";

async function loginFunc(cred) {
  if (!cred.email || !cred.password) {
    throw new Error("Email and password are required.");
  }

  connectToDb();
  try {
    const user = await User.findOne({ email: cred.email });
    const isPaswordCorrect = await bcrypt.compare(cred.password, user.password);
    if (!user || !isPaswordCorrect) {
      throw new Error("wrong credentials");
    }
    return user;
  } catch (error) {
    throw new Error("Failed to login");
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHub({
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
      async authorize(credentials) {
        try {
          const user = await loginFunc(credentials);
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
          const foundUser = await User.findOne({ email: profile.email });
          if (!foundUser) {
            const newUser = new User({
              username: profile.login || profile.given_name,
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
    ...authConfig.callbacks,
  },
});
