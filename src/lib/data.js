"use server";

import { connectToDb } from "./connectToDb";
import { User } from "./modals";
import { unstable_noStore as noStore } from "next/cache";

export async function getUsers() {
  /* unstable_noStore is equivalent to cache: 'no-store' on a fetch
    unstable_noStore is preferred over export const dynamic = 'force-dynamic' 
    as it is more granular and can be used on a per-component basis */
  noStore();
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
}

export async function getUser(email) {
  try {
    connectToDb();
    const user = await User.findOne({ email: email }).lean();
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
}

/* export const getFavorites = async (email) => {
  const user = await getUser(email);
  return user?.favorites;
};
 */