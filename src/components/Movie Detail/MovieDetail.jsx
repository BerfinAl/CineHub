"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

function MovieDetail({ movie }) {
  const router = useRouter();

  function handleClick() {
    router.back();
  }

  const notify = () => toast("Wow so easy !");

  return (
    <div>
      <button onClick={notify}>Notify !</button>
      <button onClick={handleClick}>Go Back</button>
      <h1>{movie.original_title}</h1>
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieDetail;
