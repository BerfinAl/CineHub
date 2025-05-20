"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./movie.module.css";
import { useSession } from "next-auth/react";
import { BASE_URL } from "@/constants";

import {
  Bookmark,
  BookmarkFill,
  Heart,
  HeartFill,
  Eye,
  EyeFill,
} from "react-bootstrap-icons/dist";

import MovieAction from "../MovieAction/MovieAction";

import useUserActionUIState from "@/hooks/useUserActionUIState";

function Movie({ movie }) {
  const { status } = useSession();

  const {
    optimisticOnFavList,
    optimisticOnWatchedMoviesList,
    optimisticOnWatchlist,
    handleClick,
  } = useUserActionUIState(movie.id);

  const movieActions = [
    {
      action: "addToWatchedMovies",
      emptyIcon: <Eye size={16} />,
      fillIcon: (
        <EyeFill className={styles.favorited} size={16} color="green" />
      ),
      fill: optimisticOnWatchedMoviesList,
    },
    {
      action: "addToFavorites",
      emptyIcon: <Heart size={16} />,
      fillIcon: (
        <HeartFill className={styles.favorited} size={16} color="red" />
      ),
      fill: optimisticOnFavList,
    },
    {
      action: "addToWatchlist",
      emptyIcon: <Bookmark size={16} />,
      fillIcon: (
        <BookmarkFill className={styles.favorited} size={16} color="white" />
      ),
      fill: optimisticOnWatchlist,
    },
  ];

  return (
    <div
      className={`${styles.movieCard} col d-flex flex-column align-items-start`}
    >
      <div className={styles.movieImgWrapper}>
        <Image
          src={`${BASE_URL}${movie.poster_path}`}
          width={0}
          height={0}
          sizes="200px"
          style={{
            width: "200px",
            height: "auto",
            maxHeight: "300px",
            aspectRatio: "2 / 3",
          }} // optional
          alt={movie.title}
        />
        {status === "authenticated" && (
          <div className={styles.actionsBox}>
            {movieActions.map((a) => (
              <MovieAction
                key={a.action}
                action={a.action}
                movieId={movie.id}
                emptyIcon={a.emptyIcon}
                fillIcon={a.fillIcon}
                fill={a.fill}
                handleClick={handleClick}
              />
            ))}
          </div>
        )}
      </div>
      <Link href={`/movie/${movie.id}`} className={styles.movieTitleWrapper}>
        {movie.title}
      </Link>
    </div>
  );
}

export default Movie;
