export const fetchMovieImages = async (id) => {
  const response = await fetch(`/api/movieImagesApi?id=${id}`);
  const data = await response.json();
  return data;
};
