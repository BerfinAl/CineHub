// pages/discover/trending/[movieId].js

import MovieDetail from "@/components/Movie Detail/MovieDetail";

export const generateMetadata = async ({ params }) => {
  const { movieId } = params;

// in nextjs, if we try to fetch the same data multipl times, 
// next only fetches once
  const movie= await getData(movieId);

  return {
    title: movie.original_title,
    description: movie.overview,
  };
};


const getData = async (movieId) => {
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
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );

  if (!res.ok) {
    throw new Error("Cannot fetch data");
  }

  const data = await res.json();
  return data;
};

const Page = async ({ params }) => {
  const { movieId } = params;

  const data = await getData(movieId);

  return <MovieDetail movie={data} />;
};

export default Page;
