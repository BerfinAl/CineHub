import { connectToDb } from "@/lib/connectToDb";
import { Link } from "@/lib/modals";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
  },
  // next caches the data by default
  // cache: "no-store",
  next: {
    revalidate: 3600,
  },
};

export const getNewReleases = async () => {
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

export const getUpcoming = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    options
  );

  if (!res.ok) {
    throw new Error("Cannot fetch data");
  }

  const data = await res.json();
  return data;
};

export const getTrending = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  );
  if (!res.ok) {
    throw new Error("Cannot fetch data");
  }

  const data = await res.json();
  return data;
};

export async function fetchMoviesByType(type, limit = 4) {
  let movies = [];

  switch (type) {
    case "New Releases":
      movies = await getNewReleases();
      break;
    case "Trending":
      movies = await getTrending();
      break;
    case "Upcoming":
      movies = await getUpcoming();
      break;
    default:
      break;
  }

  return movies.results?.slice(0, limit);
}

export async function getMenuLinks() {
  try {
    connectToDb();
    const links = await Link.find();
    const data = JSON.parse(JSON.stringify(links));
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch links!");
  }
}
