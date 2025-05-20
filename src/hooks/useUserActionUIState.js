import { useUser } from "@/UserContext";
import { toastIt } from "@/utils/utils";
import { useState, useCallback } from "react";

function useUserActionUIState(movieId) {
  const { initialWatchedMoviesList, initialWatchlistMovies, initialFavMovies, user } = useUser();

  const [optimisticOnFavList, setOptimisticOnFavList] = useState(
    initialFavMovies.some((m) => m.movieID === parseInt(movieId))
  );
  const [optimisticOnWatchlist, setOptimisticOnWatchlist] = useState(
    initialWatchlistMovies.some((m) => m.movieID === parseInt(movieId))
  );
  const [optimisticOnWatchedMoviesList, setOptimisticOnWatchedMoviesList] = useState(
    initialWatchedMoviesList.some((m) => m.movieID === parseInt(movieId))
  );

  const handleClick = useCallback(
    async (movieId, action) => {
      try {
        const response = await fetch(`/api/${action}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: user.email,
            movieID: movieId,
          }),
        });

        const data = await response.json();

        if (data.success) {
          switch (action) {
            case "addToWatchlist":
              setOptimisticOnWatchlist((prev) => data.success ? !prev : prev);
              toastIt(data.message, data.success);
              break;
            case "addToFavorites":
              setOptimisticOnFavList((prev) => data.success ? !prev : prev);
              toastIt(data.message, data.success);
              break;
            case "addToWatchedMovies":
              setOptimisticOnWatchedMoviesList((prev) => data.success ? !prev : prev);
              toastIt(data.message, data.success);
              break;
          }
        } else {
          toastIt(data.message || "Something went wrong", false);
        }
      } catch (error) {
        console.error(error);
        toastIt("Request failed", false);
      }
    },
    [user]
  );

  return {
    optimisticOnFavList,
    optimisticOnWatchlist,
    optimisticOnWatchedMoviesList,
    handleClick,
  };
}

export default useUserActionUIState;
