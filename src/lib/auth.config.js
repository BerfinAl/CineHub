export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.username = user.username;
        token.img = user.img || user.image || "/images/user.png";
        token.provider = account.provider;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.isAdmin = token.isAdmin;
      session.user.img = token.img;
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

      // ONLY ADMIN CAN ACCESS THE ADMIN DASHBOARD
      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      // ONLY AUTH USER CAN ACCESS THE MY WATCHLIST
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
};
