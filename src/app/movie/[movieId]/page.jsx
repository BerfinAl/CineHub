// pages/discover/trending/[movieId].js

import MovieDetail from "@/components/Movie Detail/MovieDetail";
import {
  getCast,
  getKeywords,
  getMovieByID,
  getRecommendations,
  getVideos,
} from "@/utils/utils";

const Page = async ({ params }) => {
  const { movieId } = params;

  const movieData = await getMovieByID(movieId);
  const videoData = await getVideos(movieId);
  const credits = await getCast(movieId);
  const recommendations = await getRecommendations(movieId ,movieData.genres , credits);


  const trailer = videoData?.results.find((v) => v.name === "Official Trailer");
  const movie = {
    ...movieData,
    trailerId: trailer ? trailer.key : null,
    credits: credits,
    recommendations: recommendations,
  };

  return <MovieDetail movie={movie} />;
};

export default Page;
