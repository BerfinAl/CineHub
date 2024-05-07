import React from "react";
import Movie from "../Movie/Movie";
import { fetchMoviesByType} from "@/utils/utils";
import styles from "./moviesSection.module.css"

async function MoviesSection({ type }) {
  const movies = await fetchMoviesByType(type);

  const movieElements = movies.map((movie) => (
    <Movie key={movie.id} movie={movie} />
  ));

  return (
    <>
      <h1>{type}</h1>
      <div className={`row ${styles.moviesWrapper}`}>{movieElements}</div>
    </>
  );
}

export default MoviesSection;
