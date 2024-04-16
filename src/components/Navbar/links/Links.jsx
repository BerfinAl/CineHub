"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Dropdown from "react-bootstrap/Dropdown";
import styles from "./link.module.css";
import { handleLogout } from "@/lib/action";

function Links({ session }) {
  const pathname = usePathname();

  /*     useEffect(() => {
        typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
    }, [])
 */
  const linksArr = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Discover",
      path: "/discover",
      children: [
        {
          title: "Trending Movies",
          path: "/discover/trendingmovies",
        },
        {
          title: "New Releases",
          path: "/discover/newreleases",
        },
        {
          title: "Genres",
          path: "/discover/genres",
        },
      ],
    },
    {
      title: "My Watchlist",
      path: "/about",
      isUserMenu: true,
    },
    {
      title: "About Us",
      path: "/about",
    },
    {
      title: "Log in",
      path: "/login",
      isBtn: true,
    },
    {
      title: "Admin",
      path: "/admin",
      isUserMenu: true,
      isAdminMenu: true,
    },
    {
      title: "Log Out",
      path: "/logout",
      isUserMenu: true,
      isBtn: true,
      insideForm: true,
    },
  ];

  const isAdmin = false;

  const renderLink = (link, index) => {
    const isLinkVisible =
      (!link.isAdminMenu || isAdmin) && (!link.isUserMenu || session?.user);

    if (link.title === "Log in" && session) {
      return null;
    }

    const hasSubmenu = Object.keys(link).includes("children");

    if (isLinkVisible) {
      if (hasSubmenu) {
        return (
          <li
            className={`${
              pathname.startsWith(link.path) ? `${styles.active}` : ""
            } ${styles.navlinks}`}
            key={index}
          >
            <Dropdown>
              <Dropdown.Toggle
                className={`${styles.navlinks} border-0`}
                variant="bg-transparent"
                id="dropdown-basic"
              >
                {link.title.toUpperCase()}
              </Dropdown.Toggle>

              <Dropdown.Menu className={styles.dropdownmenu}>
                {link.children.map((child, i) => {
                  return (
                    <Dropdown.Item key={i} href={child.path}>
                      {child.title}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </li>
        );
      } else if (link.insideForm) {
        return (
          <li
            className={` ${pathname === link.path ? `${styles.active}` : ""} ${
              link.isBtn ? styles.navbtn : styles.navlinks
            }`}
            key={index}
          >
            <form action={handleLogout}>
              <button className={styles.formBtn}>
                {link.title.toUpperCase()}
              </button>
            </form>
          </li>
        );
      } else
        return (
          <li
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

  return <>{linksArr.map((link, index) => renderLink(link, index))}</>;
}

export default Links;
