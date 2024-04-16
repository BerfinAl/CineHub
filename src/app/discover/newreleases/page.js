import React from "react";

import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "New Releases",
  description: "New Releases Desc",
};


const getData = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2U5MDBjZDNiY2YwZDZlMWUwZDZjOTM2YjkwYTE3YiIsInN1YiI6IjY2MGU2MjI3MTVkZWEwMDE3YzM3NTAxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fmsFfAox3ZxzoMAiOaNFS98KVRwttMCSxb4S3b3eta8",
    },
    // next caches the data by default
    // cache: "no-store",
    next: {
      revalidate: 3600,
    },
  };

  const res = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&primary_release_year=2024&sort_by=primary_release_date.desc&vote_count.gte=500&year=2024",
    options
  );

  if (!res.ok) {
    throw new Error("Cannot fetch data");
  }

  const data = await res.json();
  return data;
};

async function NewReleases() {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  const newReleasedMovies = await getData();
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
