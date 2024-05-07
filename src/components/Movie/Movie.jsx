import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

function Movie({movie}) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  return (
    <Link className="col-3 p-0" href={`/discover/newreleases/${movie.id}`}>
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
  )
}

export default Movie