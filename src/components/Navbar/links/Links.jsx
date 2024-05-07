"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./link.module.css";
import LinkItem from "./LinkItem/LinkItem";

function Links({ session }) {
  const [selected, setSelected] = useState(null);

  const handleSetSelected = (val) => {
    setSelected(val);
  };

  const pathname = usePathname();

  const username = session?.user.username || session?.user.name.split(" ")[0];

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
          title: "Trending",
          path: "/discover/trending",
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
      title: "Genres",
      path: "/genres",
    },
    {
      title: `${username?.toUpperCase()}`,
      path: `/${username}`,
      isUserMenu: true,
      children: [
        {
          title: "Favorites",
          path: `/${username}/favorites`,
        },
        {
          title: "Watclist",
          path: `/${username}/watchlist`,
        },
        {
          title: "Settings",
          path: `/${username}/Settings`,
        },
        {
          title: "Admin",
          path: "/admin",
          isUserMenu: true,
          isAdminMenu: true,
          isBtn: true,
        },
        {
          title: "Logout",
          logout: true,
        },
      ],
    },
    {
      title: "Log in",
      path: "/login",
      isBtn: true,
    },
  ].map((n, idx) => ({ ...n, id: idx + 1 }));

  return (
    <ul
      onMouseLeave={() => handleSetSelected(null)}
      className={styles.navlinksContainer}
    >
      {linksArr.map((link, index) => (
        <LinkItem
          key={index}
          link={link}
          pathname={pathname}
          index={index}
          session={session}
          selected={selected}
          handleSetSelected={handleSetSelected}
        />
      ))}
    </ul>
  );
}

export default Links;
