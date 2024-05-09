import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./movie.module.css"

function Movie({ movie }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  return (
    <Link
      className="col-3 p-0 d-flex flex-column justify-content-between align-items-start"
      href={`/discover/newreleases/${movie.id}`}
    >
      <Image
        src={`${BASE_URL}${movie.poster_path}`}
        width={0}
        height={0}
        sizes="200px"
        style={{
          width: "90%",
          height: "85%",
          objectFit: "cover",
        }} // optional
        alt="logo"
      />
      <div className={styles.movieTitleWrapper}>{movie.original_title}</div>
    </Link>
  );
}

export default Movie;
