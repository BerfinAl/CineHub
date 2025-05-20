"use server";

/* Add 'use server' at the top of an async function body to mark the function as callable by the client. We call these functions Server Actions. */

/* Because the underlying network calls are always asynchronous, 'use server' can only be used on async functions. */

import { getUsers } from "../../lib/data";
import UserCard from "@/components/User/UserCard";
import styles from "./users.module.css";

export default async function AdminPage() {
  const users = await getUsers();

  const userElements = JSON.parse(JSON.stringify(users)).map((user) => (
    <UserCard key={user._id} user={user} />
  ));

  return (
    <>
      Admin Page
      <div className={styles.users}>{userElements}</div>
    </>
  );
}
