"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./link.module.css";
import LinkItem from "./LinkItem/LinkItem";

function Links({ links }) {
  const [selected, setSelected] = useState(null);

  const handleSetSelected = (val) => {
    setSelected(val);
  };

  const pathname = usePathname();

  const sortedMenuItems = links.sort(
    (a, b) => (a.order || Infinity) - (b.order || Infinity)
  );

  return (
    <ul
      onMouseLeave={() => handleSetSelected(null)}
      className={`${styles.navlinksContainer} col-8`}
    >
      {sortedMenuItems.map((link, index) => (
        <LinkItem
          key={index}
          link={link}
          pathname={pathname}
          index={index}
          selected={selected}
          handleSetSelected={handleSetSelected}
        />
      ))}
    </ul>
  );
}

export default Links;
