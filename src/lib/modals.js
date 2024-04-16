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
      required: true,
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

export const User = mongoose.models.User ||  mongoose.model("User", userSchema);
