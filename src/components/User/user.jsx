"use client";

import Image from "next/image";
import { deleteUser } from "../../lib/action";
import styles from "./user.module.css";

const UserCard = ({ user }) => {
  const handleDeleteUser = () => {
    deleteUser(user._id); // Call your delete function here
  };

  return (
    <div key={user._id} className={styles.user}>
      <Image
        src={`${user.img ? user.img : "/images/user.png"}`}
        width={50}
        height={50}
        style={{ borderRadius: "50%" , objectFit: "cover" }}
        alt="user-img"
      />
      <div>{user.name}</div>
      <div>{user.email}</div>
      <button onClick={handleDeleteUser}>Delete User</button>
    </div>
  );
};

export default UserCard;
