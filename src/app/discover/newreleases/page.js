import React from "react";

import Link from "next/link";
import Image from "next/image";
import { getNewReleases } from "@/utils/utils";
import Movie from "@/components/MovieCard/MovieCard";

export const metadata = {
  title: "New Releases",
  description: "New Releases Desc",
};

async function NewReleases() {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  const newReleasedMovies = await getNewReleases();
  const newReleasedMoviesElements = newReleasedMovies.results.map((movie) => {
    return <Movie key={movie.id} movie={movie} />;
  });

  return (
    <div className='mt-5 px-3'>
      <h2>What’s Hot Right Now</h2>
      <p>
        Dive into the buzzworthy films everyone’s talking about. From box-office
        smashes to critically acclaimed hits, these movies are setting the world
        on fire—don’t miss out!
      </p>
      <div className="row row-cols-2 row-cols-sm-4 row-cols-md-6 g-5">
        {newReleasedMoviesElements}
      </div>
    </div>
  );
}

export default NewReleases;
