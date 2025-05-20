"use client";

import React from "react";
import styles from "../MovieCard/movie.module.css";

function MovieAction({ movieId, action, emptyIcon, fillIcon, fill, handleClick }) {
  return (
    <button
      onClick={() => handleClick(movieId, action)}
      className={styles.actionBtn}
    >
      {fill ? fillIcon : emptyIcon}
    </button>
  );
}

export default MovieAction;
