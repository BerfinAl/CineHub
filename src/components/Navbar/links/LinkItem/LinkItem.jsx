"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../link.module.css";
import { FiChevronDown } from "react-icons/fi";
import Submenu from "../Submenu/Submenu";
import { useUser } from "@/UserContext";

const LinkItem = ({
  link,
  pathname,
  index,
  selected,
  handleSetSelected,
}) => {

const {user} = useUser();

  const isAdmin = user?.isAdmin;
  const username = user?.username || user?.name.split(" ")[0];
  const profilePic = user?.img;


  const isLinkVisible =
    (!link.isAdminMenu || isAdmin) && (!link.isUserMenu || user);

  if (link.login && user) {
    return null;
  }

  const hasSubmenu = link.children.length > 0;

  if (isLinkVisible) {
    if (hasSubmenu) {
      if (link.isUserMenu) {

        return (

          <li
            className={`order-last ${
              pathname.includes(username) ? `${styles.active}` : ""
            } ${styles.navlinks} index-button ${
              selected === index ? "selected" : ""
            }`}
            key={index}
            id={`shift-index-${index}`}
            onMouseEnter={() => handleSetSelected(index)}
          >
            <div className={`${styles.profilePic} border-0`} style={{backgroundImage: `url(${profilePic})`}} ></div>
{/*             <FiChevronDown
              className={`{styles.chevron} ${
                0 === index ? styles.rotate : ""
              }`}
            /> */}

            {selected === index && <Submenu content={link.children} parent={username} />}
          </li>
        );
      } else {
        return (
          <li
            className={`${
              pathname.startsWith(link.path) ? `${styles.active}` : ""
            } ${styles.navlinks} index-button ${
              selected === index ? "selected" : ""
            }`}
            key={index}
            id={`shift-index-${index}`}
            onMouseEnter={() => handleSetSelected(index)}
          >
            <div className={` border-0`}>{link.title.toUpperCase()}</div>
            <FiChevronDown
              className={`{styles.chevron} ${
                selected === index ? styles.rotate : ""
              }`}
            />

            {selected === index && (
              <Submenu parent={link.path} content={link.children} />
            )}
          </li>
        );
      }
    } else
      return (
        <li
          onMouseLeave={() => handleSetSelected(null)}
          className={` ${pathname === link.path ? `${styles.active}` : ""} ${
            link.isBtn ? styles.navbtn : styles.navlinks
          }`}
          key={index}
        >
          <Link href={link.path}>{link.title.toUpperCase()}</Link>
        </li>
      );
  }

  return null;
};

export default LinkItem;
