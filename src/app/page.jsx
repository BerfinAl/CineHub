import HomeBanner from "@/components/HomeBanner/HomeBanner";
import MoviesSection from "@/components/MoviesSection/MoviesSection";
import { fetchMoviesByType } from "@/utils/utils";
import styles from "./page.module.css";

import { getMenuLinks } from "@/utils/utils";

export default async function Home() {
  const links = await getMenuLinks();
  const discover = links.filter((link) => link.title === "Discover")[0];


  const discoverSectionElements = discover.children.map(async (section, i) => {
  const movies = await fetchMoviesByType(section.title);
    return (
      <section key={i} className={styles.moviesSection}>
        <MoviesSection movies={movies} type={section.title} link={section.path} />
      </section>
    );
  });

  return (
    <>
      <HomeBanner />
      <div className={styles.discoverSectionWrapper}>
        {discoverSectionElements}
      </div>
    </>
  );
}
