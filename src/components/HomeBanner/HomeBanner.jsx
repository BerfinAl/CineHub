"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./homebanner.module.css";
import CurvedText from "@/components/CurvedText/CurvedText";

function HomeBanner() {
  // const { data: session } = useSession();
  // const isLoggedIn = session?.user;
  return (
    <div className={styles.homeBanner}>
      <div className={styles.bannertextWrapper}>
        <h1 className={styles.bannertext}>
          Your <br /> Personalized <br />
          Movie <br /> Universe
        </h1>
  {/*       <Link
          className={styles.bannerActionBtn}
          href={session?.user ? "/discover/newreleases" : "/register"}
        >
          <Image
            src="/images/right-arrow.png"
            width={50}
            height={50}
            className={`${styles.joinArrow} joinArrow`}
            alt="join-arrrow"
          />
          <div className={`${styles.dot} dot`}></div>
          <CurvedText isLoggedIn={isLoggedIn} />
        </Link> */}
      </div>
      <Image
        src="/images/home12.jpg"
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: "99vw",
          height: "100%",
          zIndex: "-1",
          objectFit: "cover",
          position: "relative",
        }} // optional
        alt="home"
      />
    </div>
  );
}

export default HomeBanner;
