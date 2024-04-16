"use client";

import { useRouter } from "next/navigation";
import React from "react";

function MovieDetail({ movie }) {
  const router = useRouter();

  function handleClick() {
    router.back();
  }

  return (
    <div>
      <button onClick={handleClick}>Go Back</button>
      <h1>{movie.original_title}</h1>
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieDetail;
