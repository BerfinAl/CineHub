import React from "react";

import Link from "next/link";
import Image from "next/image";
import { getNewReleases } from "@/utils/utils";

export const metadata = {
  title: "New Releases",
  description: "New Releases Desc",
};

async function NewReleases() {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  const newReleasedMovies = await getNewReleases();
  const newReleasedMoviesElements = newReleasedMovies.results.map((movie) => {
    return (
      <Link key={movie.id} href={`/discover/newreleases/${movie.id}`}>
        <Image
          src={`${BASE_URL}${movie.poster_path}`}
          width={0}
          height={0}
          sizes="200px"
          style={{
            width: "auto",
            height: "auto",
            maxHeight: "100%",
            maxWidth: "100%",
          }} // optional
          alt="logo"
        />
        {movie.original_title} / {movie.release_date}
      </Link>
    );
  });

  return <div>{newReleasedMoviesElements}</div>;
}

export default NewReleases;
