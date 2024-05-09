import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import CurvedText from "@/components/CurvedText/CurvedText";
import { auth } from "@/lib/auth";
import MoviesSection from "@/components/MoviesSection/MoviesSection";
import { getMenuLinks } from "@/utils/utils";

export default async function Home() {
  const session = await auth();
  const isLoggedIn = session?.user;

  const links = await getMenuLinks();
  const discover = links.filter((link) => link.title === "Discover")[0];

  const discoverSectionElements = discover.children.map((section) => {

    return (
      <section className={styles.moviesSection}>
        <MoviesSection type={section.title} link={section.path} />
      </section>
    );
  });

  return (
    <>
      <div className={styles.homeBanner}>
        <div className={styles.bannertextWrapper}>
          <h1 className={styles.bannertext}>
            Your <br /> Personalized <br />
            Movie <br /> Universe
          </h1>
          <Link
            className={styles.bannerActionBtn}
            href={isLoggedIn ? "/discover/newreleases" : "/register"}
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
          </Link>
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
            filter: "brightness(0.4)",
          }} // optional
          alt="home"
        />
      </div>

      {discoverSectionElements}

    </>
  );
}
