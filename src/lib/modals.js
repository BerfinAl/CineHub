import { default as mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      min: 5,
      max: 15,
    },
    img: {
      type: String,
      default: "/images/user.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const linkSchema = new mongoose.Schema({
  title: String,
  path: String,
  children: Array,
  isUserMenu: {
    type: Boolean,
    default: false,
  },
  isBtn: {
    type: Boolean,
    default: false,
  },
  isAdminMenu: {
    type: Boolean,
    default: false,
  },
  logout: {
    type: Boolean,
    default: false,
  },
  login: {
    type: Boolean,
    default: false,
  },
});

export const Link = mongoose.models?.Link || mongoose.model("Link", linkSchema);
export const User = mongoose.models?.User || mongoose.model("User", userSchema);
