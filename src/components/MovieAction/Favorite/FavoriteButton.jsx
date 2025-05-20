"use client";

import React, { useState } from "react";
import {
  Bookmark,
  BookmarkFill,
  Heart,
  HeartFill,
} from "react-bootstrap-icons";
import styles from "../movieAction.module.css";
import { toast } from "react-toastify";

function FavoriteButton({ userid, movieId, favorited }) {
  const [favorite, setFavorite] = useState(favorited);

  const toastIt = (message, success) => {
    return success ? toast.success(message) : toast.error(message);
  };

  const handleAddToFavorites = async (movieId) => {
    try {
      const response = await fetch("/api/addToFavorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID: userid, movieID: movieId }),
      });

      const data = await response.json();
      toastIt(data.message, data.success);
      setFavorite(data.favorited);
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toastIt(data.message, data.success);
      setFavorite(data.favorited);
    }
  };

  return (
    <button
      onClick={() => handleAddToFavorites(movieId)}
      className={styles.actionBtn}
    >
      {favorite ? (
        <HeartFill className={styles.favorited} size={22} color="red" />
      ) : (
        <Heart size={22} />
      )}
    </button>
  );
}

export default FavoriteButton;
