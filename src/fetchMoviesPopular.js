import { fetchMovieDetails } from "./fetchMovieDetails.js";

export const fetchMoviesPopular = async () => {
  const response = await fetch(`/api/moviesPopularApi`);
  const data = await response.json();
  const results = data[1].id;
  fetchMovieDetails(results);
};
