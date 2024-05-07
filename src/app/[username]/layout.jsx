import UserCard from "@/components/User/UserCard";
import { auth } from "@/lib/auth";
import React from "react";

async function UserLayout({ children }) {
  const session = await auth();

  let user;

  if (session?.user) {
    user = session.user;
  }

  return (
    <div>
      <UserCard user={user} />
      {children}
    </div>
  );
}

export default UserLayout;
