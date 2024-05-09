"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./link.module.css";
import LinkItem from "./LinkItem/LinkItem";

function Links({ session, links }) {
  const [selected, setSelected] = useState(null);

  const handleSetSelected = (val) => {
    setSelected(val);
  };

  const pathname = usePathname();


  return (
    <ul
      onMouseLeave={() => handleSetSelected(null)}
      className={styles.navlinksContainer}
    >
      {links.map((link, index) => (
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
