"use client";

import React from "react";
import Movie from "../MovieCard/MovieCard";
import styles from "./moviesSection.module.css";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ChevronRight } from "react-bootstrap-icons/dist";

function MoviesSection({ movies, type, link }) {
  const movieElements = movies?.map((movie) => (
    <SwiperSlide key={movie.id}>
      <Movie movie={movie} />
    </SwiperSlide>
  ));

  return (
    <>
      <div className={styles.sectionTitleWrapper}>
        <Link href={`discover/${link}`} className={styles.sectionTitle}>
          {type}
          <span className={styles.seeAll}>
            See all <ChevronRight />
          </span>
        </Link>
      </div>
      <div className="w-100 movies-wrapper">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20} // Space between slides
          slidesPerView="auto" // Number of slides visible at once
          navigation={true}
          pagination={true}
          loop={true}
        >
          {movieElements}
        </Swiper>
      </div>
      {/*  <div className={`row ${styles.moviesWrapper}`}>{movieElements}</div> */}
    </>
  );
}

export default MoviesSection;
