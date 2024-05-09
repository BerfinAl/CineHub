import React from "react";
import Links from "./links/Links";
import styles from "../../app/layout.module.css";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getMenuLinks } from "@/utils/utils";

async function Navbar() {

  const session = await auth();

  const links = await getMenuLinks();

  return (
    <nav className={`${styles.nav} row flex-container`}>
      <div className="col-12 h-50">
        <Link href="/" className={`${styles.logoWrapper}`}>

          <Image
            priority={true} 
            src="/images/logo.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "auto",
              height: "auto",
              maxHeight: "100%",
              maxWidth: "100%",
            }} // optional
            alt="logo"
          />
        </Link>
      </div>
    {/*   <ul className={`${styles.navlinks} col-8`}> */}
        <Links session={session} links={links} />
   {/*    </ul> */}
    </nav>
  );
}

export default Navbar;
