import React from "react";
import Movie from "../Movie/Movie";
import { fetchMoviesByType, getMenuLinks } from "@/utils/utils";
import styles from "./moviesSection.module.css";
import Link from "next/link";

async function MoviesSection({ type, link }) {
  const movies = await fetchMoviesByType(type);

  const movieElements = movies?.map((movie) => (
    <Movie key={movie.id} movie={movie} />
  ));

  return (
    <>
      <div className={styles.sectionTitleWrapper}>
        <h1>{type}</h1> <Link href={`discover/${link}`}>See all</Link>
      </div>

      <div className={`row ${styles.moviesWrapper}`}>{movieElements}</div>
    </>
  );
}

export default MoviesSection;
