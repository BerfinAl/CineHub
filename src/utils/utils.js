import { connectToDb } from "@/lib/connectToDb";
import { Like, Link, WatchedMovies, Watchlist } from "@/lib/modals";
import { toast } from "react-toastify";

const currentYear = new Date().getFullYear();

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
    `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&primary_release_year=${currentYear}&sort_by=primary_release_date.desc&vote_count.gte=500&year=${currentYear}`,
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

export const getVideos = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return null;
  }
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
console.log(data)
  return data;
};

export async function fetchMoviesByType(type, limit = 10) {
  let movies = [];

  switch (type) {
    case "New Releases":
      movies = await getNewReleases(limit);
      break;
    case "Trending":
      movies = await getTrending(limit);
      break;
    case "Upcoming":
      movies = await getUpcoming(limit);
      break;
    default:
      break;
  }

  return movies.results?.slice(0, limit);
}

export async function getMenuLinks() {
  try {
    await connectToDb();
    const links = await Link.find();
    const data = JSON.parse(JSON.stringify(links));
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch links!");
  }
}

export const getFavorites = async (email) => {
  try {
    await connectToDb();

    const favorites = await Like.where("userEmail").equals(email).lean();

    return favorites;
  } catch (err) {
    console.log(err.message);
    throw new Error("Failed to fetch favorites");
  }
};

export const getWatchlist = async (email) => {
  try {
    await connectToDb();

    const watchlist = await Watchlist.where("userEmail").equals(email).lean();

    return watchlist;
  } catch (err) {
    console.log(err.message);
    throw new Error("Failed to fetch watchlist");
  }
};

export const getWatchedMoviesList = async (email) => {
  try {
    await connectToDb();

    const watchlist = await WatchedMovies.where("userEmail").equals(email).lean();

    return watchlist;
  } catch (err) {
    console.log(err.message);
    throw new Error("Failed to fetch watched movies");
  }
};

/* export async function getUsersFavorites() {
  const favorites = await getFavorites(email);
  const favMovie = favorites.find((movie) => Number(movie) === movieId);
  setFavorited(!!favMovie);
} */

export const getMovieByID = async (id) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      options
    );

    if (!res.ok) {
      throw new Error("Cannot fetch movie");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null; // Return null if data cannot be fetched
  }
};

export const getCast = async (id) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      options
    );

    if (!res.ok) {
      throw new Error("Cannot fetch movie");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null; // Return null if data cannot be fetched
  }
};

export const getKeywords = async (id) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/keywords`,
      options
    );

    if (!res.ok) {
      throw new Error("Cannot fetch movie");
    }

    const data = await res.json();
    return data.keywords;
  } catch (error) {
    console.error(error);
    return null; // Return null if data cannot be fetched
  }
};

export const getRecommendations = async (movieId, genres, crew) => {

  function extractAndEncode(data, key) {
    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid data structure");
    }
    return data.map((item) => encodeURIComponent(item[key])).join("%20%7C%20");
  }

  function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  const keywords = await getKeywords(movieId);

  const structuredCrew = [
    ...crew.cast.slice(0, 3),
    crew.crew.find((m) => m.job === "Director"),
  ];

  const encodedKeywords = extractAndEncode(keywords, "id");
  const encodedCrew = extractAndEncode(structuredCrew, "id");
  const encodedGenres = extractAndEncode(genres, "id");

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${encodedGenres}&with_keywords=${encodedKeywords}`,
      options
    );

    const res2 = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&&with_crew=${encodedCrew}`,
      options
    );

    if (!res.ok | !res2.ok) {
      throw new Error("Cannot fetch Recommendations");
    }

    const data = await res.json();
    const data2 = await res2.json();
    const newData = [...data.results.filter((r) => r.id !== parseInt(movieId)), ...data2.results.filter((r) => r.id !== parseInt(movieId))];
    shuffle(newData);
    return newData;
  } catch (error) {
    console.error(error);
    return null; // Return null if data cannot be fetched
  }
};

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  export const toastIt = (message, success) => {
    return success
      ? toast.success(message, toastOptions)
      : toast.error(message, toastOptions);
  };

/* export const getMoviesByPerson = async (id) => {
${id}
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/person?query=Tom%20Hardy&include_adult=false&language=en-US&page=1`,
      options
    );

    if (!res.ok) {
      throw new Error("Cannot fetch movie");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null; // Return null if data cannot be fetched
  }
};
 */
