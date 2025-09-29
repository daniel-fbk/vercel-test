export const fetchMovieCredits = async (id) => {
  const response = await fetch(`/api/movieCreditsApi?id=${id}`);
  const data = await response.json();
  return data;
};
