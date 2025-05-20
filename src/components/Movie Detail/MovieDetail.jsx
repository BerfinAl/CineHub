"use client";

import React from "react";
import { BASE_URL } from "@/constants";
import Image from "next/image";
import styles from "./MovieDetail.module.css";
import {
  Bookmark,
  BookmarkFill,
  Heart,
  HeartFill,
  Eye,
  EyeFill,
} from "react-bootstrap-icons/dist";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Movie from "../MovieCard/MovieCard";
import useUserActionUIState from "@/hooks/useUserActionUIState";

function MovieDetail({ movie }) {
  const {
    optimisticOnFavList,
    optimisticOnWatchedMoviesList,
    optimisticOnWatchlist,
    handleClick,
  } = useUserActionUIState(movie.id);

  const genres = movie.genres.map((g) => g.name);

  const duration = {
    hours: Math.floor(movie.runtime / 60),
    minutes: movie.runtime % 60,
  };

  const languages = movie.spoken_languages.map((l) => l.english_name);

  const releaseDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(movie.release_date));

  const cast = movie.credits.cast.map((p) => {
    return (
      <OverlayTrigger
        key={p.id}
        placement={"top"}
        overlay={<Tooltip id="tooltip-top">{p.character}</Tooltip>}
      >
        <Button className={styles.cast} variant="secondary">
          {p.name}
        </Button>
      </OverlayTrigger>
    );
  });

  const crewStructure = [];

  movie.credits.crew.forEach((p) => {
    const existingJob = crewStructure.find((c) => c.job === p.job);
    if (existingJob) {
      existingJob.people.push(p.name);
    } else {
      crewStructure.push({ job: p.job, people: [p.name] });
    }
  });

  const crew = crewStructure.map((o, index) => (
    <div className="row w-100" key={index}>
      <span className="col-6">{o.job}</span>
      <span className="col-6">
        <span className={styles.peopleWrapper}>
          {o.people.map((name, i) => (
            <Button key={i} className={styles.cast} variant="secondary">
              {name}
            </Button>
          ))}
        </span>
      </span>
    </div>
  ));

  const recommendations = movie.recommendations.map((movie, i) => {
    return (
      <Movie key={i} movie={movie} favorite={false} addedToWatchlist={false} />
    );
  });

  function getVoteColor(vote) {
    const lowColor = { r: 255, g: 153, b: 153 }; // Pastel red
    const mediumColor = { r: 255, g: 229, b: 153 }; // Pastel orange
    const highColor = { r: 153, g: 255, b: 153 }; // Pastel green

    let r, g, b;

    if (vote <= 5) {
      // Interpolate between lowColor and mediumColor
      const ratio = vote / 5;
      r = Math.round(lowColor.r + (mediumColor.r - lowColor.r) * ratio);
      g = Math.round(lowColor.g + (mediumColor.g - lowColor.g) * ratio);
      b = Math.round(lowColor.b + (mediumColor.b - lowColor.b) * ratio);
    } else {
      // Interpolate between mediumColor and highColor
      const ratio = (vote - 5) / 5;
      r = Math.round(mediumColor.r + (highColor.r - mediumColor.r) * ratio);
      g = Math.round(mediumColor.g + (highColor.g - mediumColor.g) * ratio);
      b = Math.round(mediumColor.b + (highColor.b - mediumColor.b) * ratio);
    }

    return `rgb(${r}, ${g}, ${b})`;
  }

  return (
    <>
      <div className={styles.bannerWrapper}>
        <Image
          src={`${BASE_URL}${movie.backdrop_path}`}
          width={0}
          height={0}
          sizes="2000px"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          alt={movie.title}
        />
        <div className={styles.titleWrapper}>
          <div className="w-100 d-flex justify-content-between align-items-baseline">
            <h1 className={`${styles.title}`}>{movie.title}</h1>
            <div className="d-flex gap-3">
              <a
                className={styles.trailer}
                href={` https://www.youtube.com/watch?v=${movie.trailerId}`}
                target="_blank"
              >
                Trailer
              </a>
              <a
                className={styles.imdbBtn}
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
              >
                <Image
                  src="/images/imdb.png"
                  width={0}
                  height={60}
                  sizes="90px"
                  style={{
                    width: "auto",
                    objectFit: "cover",
                  }} // optional
                  alt="home"
                />
              </a>
            </div>
          </div>
          <h6 className={styles.tagline}>{movie.tagline}</h6>
        </div>
      </div>
      <div className={`row ${styles.movieContent}`}>
        <p className={`col-7 ${styles.overview}`}>{movie.overview}</p>
        <div className={`col-5 ${styles.moreinfoBox} mb-3`}>
          <div
            className={`${styles.moreinfoBoxInner} ${styles.userActionsBox} d-flex justify-content-around align-items-center`}
          >
            <div
              className={styles.action}
              onClick={() => handleClick(movie.id, "addToWatchedMovies")}
            >
              {optimisticOnWatchedMoviesList ? (
                <EyeFill
                  /* className={styles.favorited} */ size={28}
                  color="green"
                />
              ) : (
                <Eye size={28} />
              )}
              Watched
            </div>
            <div
              className={styles.action}
              onClick={() => handleClick(movie.id, "addToFavorites")}
            >
              {optimisticOnFavList ? (
                <HeartFill
                  /* className={styles.favorited} */ size={28}
                  color="red"
                />
              ) : (
                <Heart size={28} />
              )}
              Favorite
            </div>
            <div
              className={styles.action}
              onClick={() => handleClick(movie.id, "addToWatchlist")}
            >
              {optimisticOnWatchlist ? (
                <BookmarkFill
                  /* className={styles.favorited} */ size={28}
                  color="white"
                />
              ) : (
                <Bookmark size={28} />
              )}
              Watchlist
            </div>
          </div>
        </div>
        <div className="col-7">
          <Tabs
            defaultActiveKey="Cast"
            id="uncontrolled-tab-example"
            className={"mb-3 credit"}
          >
            <Tab key={1} eventKey="Cast" title="Cast">
              {cast}
            </Tab>
            <Tab
              key={2}
              eventKey="Crew"
              title="Crew"
              style={{ flexDirection: "row" }}
            >
              {crew}
            </Tab>
          </Tabs>
        </div>
        <div className={`col-5 ${styles.moreinfoBox}`}>
          <div className={`${styles.moreinfoBoxInner}`}>
            <h5 className="mb-3">Behind the Frame</h5>
            <ul className="p-0 m-0">
              <li className={`${styles.details}`}>
                <span className={`${styles.detailsKey}`}>Original Title: </span>
                {movie.original_title}
              </li>
              <li className={`${styles.details}`}>
                <span className={`${styles.detailsKey}`}>Release Date: </span>{" "}
                {releaseDate}
              </li>
              <li className={`${styles.details}`}>
                <span className={`${styles.detailsKey}`}>Genres: </span>
                {genres.toString()}
              </li>
              <li className={`${styles.details}`}>
                <span className={`${styles.detailsKey}`}>Runtime: </span>
                {` ${duration.hours}h ${duration.minutes}m`}
              </li>
              <li className={`${styles.details}`}>
                <span className={`${styles.detailsKey}`}>Rating: </span>
                <span style={{ color: getVoteColor(movie.vote_average) }}>
                  {movie.vote_average}
                </span>{" "}
                {`(Based on ${movie.vote_count} votes)`}
              </li>

              <li className={`${styles.details}`}>
                <span className={`${styles.detailsKey}`}>Languages: </span>
                {languages.toString()}
              </li>
            </ul>
          </div>
        </div>

        <div className="row mt-5">
          <div className="d-flex gap-1 align-items-center mb-3">
            <Image
              src={"/images/title2.png"}
              width={0}
              height={0}
              sizes="20px"
              style={{
                width: "auto",
                height: "auto",
                objectFit: "cover",
                transform: "rotate(180deg)",
              }}
              alt={movie.title}
            />
            <h3 className="m-0">More Like This</h3>
          </div>
<div className={`row ${styles.moviesWrapper}`}>
          {recommendations}
</div> 
        </div>
      </div>
    </>
  );
}

export default MovieDetail;
