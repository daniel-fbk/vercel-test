import { bookmarkButton } from "./localStorage.js";
import { fetchMovieImages } from "./fetchMovieImages.js";

const wrapper = document.getElementById("wrapper");
const movieContainer = document.querySelector(".movie-container");

export const buildPage = async (movie) => {
  const movieData = movie;
  const time =
    Math.floor(movieData.runtime / 60) + "h " + (movieData.runtime % 60) + "m";
  const { title, popularity } = movieData;
  movieContainer.replaceChildren();

  const movieImages = await fetchMovieImages(movieData.id);
  console.log(movieImages);
  const backgroundImage =
    movieImages.backdrops.length > 0
      ? movieImages.backdrops[0].file_path
      : movieImages.posters[0].file_path;
  wrapper.style.setProperty(
    "--bg-url",
    `url("https://image.tmdb.org/t/p/original${backgroundImage}")`
  );

  const posterContainer = document.createElement("div");
  const poster = document.createElement("img");
  posterContainer.classList.add("poster-container");
  poster.classList.add("poster");
  poster.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  const movieTitle = document.createElement("h1");
  movieTitle.classList.add("movie-title");
  movieTitle.textContent = title;

  const genresContainer = document.createElement("div");
  genresContainer.classList.add("genres-container");
  movie.genres.forEach((genre) => {
    const genres = document.createElement("p");
    genres.classList.add("genres");
    genres.textContent = genre.name;
    genresContainer.append(genres);
  });

  const description = document.createElement("p");
  const releaseDate = document.createElement("p");
  const ageRating = document.createElement("p");
  description.classList.add("description");
  releaseDate.classList.add("release-date");
  ageRating.classList.add("age-rating");
  description.textContent = movie.overview;
  releaseDate.textContent = movie.release_date;
  ageRating.textContent = 5; // Need Content Rating API

  const runTime = document.createElement("p");
  runTime.classList.add("run-time");
  runTime.textContent = time;

  const ratingContainer = document.createElement("div");
  const ratingStar = document.createElement("img");
  const rating = document.createElement("p");
  ratingContainer.classList.add("rating-container");
  ratingStar.classList.add("rating-star");
  rating.classList.add("rating");

  const homePage = document.createElement("a");
  homePage.classList.add("homepage");
  homePage.textContent = `HomePage ${movie.homepage}`;
  homePage.href = movie.homepage;
  homePage.target = "_blank";

  const movieDetails = document.createElement("article");
  movieDetails.classList.add("movie-details");

  const genreYearAgeTime = document.createElement("div");
  genreYearAgeTime.classList.add("genre-year-age-time");

  movieContainer.append(
    posterContainer,
    movieDetails,
    bookmarkButton(title, popularity)
  );
  movieDetails.append(
    movieTitle,
    genreYearAgeTime,
    description,
    ratingContainer,
    homePage
  );
  posterContainer.append(poster);
  ratingContainer.append(ratingStar, rating);
  genreYearAgeTime.append(genresContainer, releaseDate, ageRating, runTime);
  // genreYearAgeTime.append(releaseDate, ageRating, runTime, genresContainer);
};

// const crewContainer = document.createElement("div");
// const crewList = document.createElement("ul");
// const director = document.createElement("li");
// const writers = document.createElement("li");
// const stars = document.createElement("li");
// crewContainer.classList.add("crew-container");
// crewList.classList.add("crew-list");
// director.classList.add("director");
// writers.classList.add("writers");
// stars.classList.add("stars");

// const videosContainer = document.createElement("section");
// const videosHeading = document.createElement("h3");
// const video = document.createElement("div");
// const videoPlayBtn = document.createElement("img");
// videosContainer.classList.add("videos-container");
// videosHeading.classList.add("videos-heading");
// video.classList.add("video");
// videoPlayBtn.classList.add("video-play-button");

// const photosContainer = document.createElement("section");
// const photosTitle = document.createElement("h3");
// const photo = document.createElement("div");
// photosContainer.classList.add("photos-container");
// photosTitle.classList.add("photos-title");
// photo.classList.add("photo");
