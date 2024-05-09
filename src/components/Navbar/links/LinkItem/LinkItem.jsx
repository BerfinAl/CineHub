import React, { useState } from "react";
import Link from "next/link";
import styles from "../link.module.css";
import { FiChevronDown } from "react-icons/fi";
import Submenu from "../Submenu/Submenu";

const LinkItem = ({
  link,
  pathname,
  index,
  session,
  selected,
  handleSetSelected,
}) => {
  const isAdmin = session?.user?.isAdmin;
  const username = session?.user.username || session?.user.name.split(" ")[0];


  const isLinkVisible =
    (!link.isAdminMenu || isAdmin) && (!link.isUserMenu || session?.user);

  if (link.login && session) {
    return null;
  }

  const hasSubmenu = link.children.length > 0;

  if (isLinkVisible) {
    if (hasSubmenu) {
      if (link.isUserMenu) {
       return( <li
          className={`${
            pathname.startsWith(username) ? `${styles.active}` : ""
          } ${styles.navlinks} index-button ${
            selected === index ? "selected" : ""
          }`}
          key={index}
          id={`shift-index-${index}`}
          onMouseEnter={() => handleSetSelected(index)}
        >
          <div className={` border-0`}>{username.toUpperCase()}</div>
          <FiChevronDown
            className={`{styles.chevron} ${
              selected === index ? styles.rotate : ""
            }`}
          />

          {selected === index && <Submenu content={link.children} />}
        </li>
       )
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

            {selected === index && <Submenu parent={link.path} content={link.children} />}
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
