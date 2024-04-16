"use server";

import { revalidatePath } from "next/cache";
import { connectToDb } from "./connectToDb";
import { User } from "./modals";
import { signIn, signOut } from "./auth";

export async function addUser(formData) {
  const { name, username, password, imgSrc, email } =
    Object.fromEntries(formData);

  try {
    connectToDb();
    const newUser = new User({
      name: name,
      username: username,
      email: email,
      password: password,
      img: imgSrc,
      isAdmin: false,
    });
    await newUser.save();
    revalidatePath("/admin");
    console.log("new user added!", newUser);
  } catch (err) {
    console.log("couldn't add the user", err);
    return { error: "Something went wrong" };
  }
}

export async function deleteUser(id) {
  try {
    connectToDb();
    await User.findByIdAndDelete(id);
    revalidatePath("/admin");
    console.log("deleted from db");
  } catch (err) {
    console.log("couldn't delete the user", err);
    return { error: "Something went wrong" };
  }
}

export async function handleGoogleLogin() {
  "use server";
  await signIn("google");
}

export async function handleGitHubLogin() {
  "use server";
  await signIn("github");
}

export async function handleLogout() {
  "use server";
  await signOut("github");
}
