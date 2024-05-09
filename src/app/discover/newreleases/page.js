import React from "react";

import Link from "next/link";
import Image from "next/image";
import { getNewReleases } from "@/utils/utils";
import Movie from "@/components/Movie/Movie";

export const metadata = {
  title: "New Releases",
  description: "New Releases Desc",
};

async function NewReleases() {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  const newReleasedMovies = await getNewReleases();
  const newReleasedMoviesElements = newReleasedMovies.results.map((movie) => {
    return <Movie movie={movie} />;
  });

  return <div className="row px-3 g-5">{newReleasedMoviesElements}</div>;
}

export default NewReleases;
