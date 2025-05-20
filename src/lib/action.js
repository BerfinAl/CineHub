"use server";

import { revalidatePath } from "next/cache";
import { connectToDb } from "./connectToDb";
import { User } from "./modals";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export async function register(prevState, formData) {
  const { name, username, password, img, email, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { success: false, message: "Passwords do not match." };
  }

  try {
    connectToDb();
    const usedEmail = await User.findOne({ email: email });
    const usedUsername = await User.findOne({ username: username });

    if (usedEmail) {
      return { success: false, message: "Already have a user with this email" };
    }

    if (usedUsername) {
      return {
        success: false,
        message: "Already have a user with this username",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    revalidatePath("/admin");
    const plainObjUser = newUser.toObject(); // Convert Mongoose document to plain JavaScript object
    plainObjUser._id = newUser._id.toString();
    return {
      success: true,
      message: "successfully registered!",
      registeredUser: plainObjUser,
    };
  } catch (err) {
    console.log("couldn't add the user", err);
    return { success: false, message: "something went wrong" };
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
  await signIn("google");
}

export async function handleGitHubLogin() {
  await signIn("github");
}

export async function login(prevState, formData) {
  const { email, password } = Object.fromEntries(formData);
  console.log(email, password);
  try {
    await signIn("credentials", { email, password });
    return { success: true, message: "logged in!" };
  } catch (err) {
    if (err.name === "CredentialsSignin") {
      return { success: false, message: "Invalid username or password" };
    }

    throw err;
  }
}

export async function handleLogout() {
  await signOut();
}


