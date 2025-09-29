import { fetchMovieDetails } from "./fetchMovieDetails.js";

export const fetchMoviesPopular = async () => {
  const response = await fetch(`/api/moviesPopularApi`);
  const data = await response.json();
  const results = data.results[1].id;
  fetchMovieDetails(results);
};
