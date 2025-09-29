import { fetchMovieCredits } from "./fetchMovieCredits.js";
import { fetchMovieDetails } from "./fetchMovieDetails.js";
import { fetchMovieSearch } from "./fetchMovieSearch.js";

const searchForm = document.getElementById("nav-search-form");
const searchBar = document.getElementById("search-bar");
const liveSearchDropdown = document.getElementById("live-search-dropdown");
const imageNotFound = new URL("./public/imagenotfound.jpg", import.meta.url)
  .href;

export const handleSearch = searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  liveSearchDropdown.replaceChildren();

  const formData = new FormData(searchForm);
  let userInput = formData.get("search-input");
  if (!userInput) {
    return;
  }
  searchBar.value = "";
  fetchMovieSearch(userInput);
});

const buildLiveSearch = async () => {
  const userInput = searchBar.value.trim();

  if (userInput.length === 0) {
    liveSearchDropdown.replaceChildren();
    return;
  }

  liveSearchDropdown.replaceChildren();

  const suggestions = await fetchMovieSearch(userInput, "input");
  const limitedSuggestions = suggestions.slice(0, 6);

  const moviesWithCredits = await Promise.all(
    limitedSuggestions.map(async (movie) => {
      const creditsData = await fetchMovieCredits(movie.id);
      return { ...movie, cast: creditsData.cast };
    })
  );

  console.log(moviesWithCredits);

  moviesWithCredits.forEach((movie) => {
    const suggestedMovie = document.createElement("div");
    suggestedMovie.classList.add("suggested-container");

    suggestedMovie.addEventListener("click", async () => {
      liveSearchDropdown.replaceChildren();
      fetchMovieDetails(movie.id);
    });

    const suggestedPosterContainer = document.createElement("div");
    suggestedPosterContainer.classList.add("suggested-poster-container");

    const suggestedPoster = document.createElement("img");
    suggestedPoster.classList.add(
      movie.poster_path ? "suggested-poster" : "suggested-poster-fallback"
    );
    suggestedPoster.src = movie.poster_path
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : imageNotFound;

    const suggestedDetails = document.createElement("div");
    suggestedDetails.classList.add("suggested-details-container");

    const suggestedTitle = document.createElement("p");
    suggestedTitle.classList.add("suggested-title");
    suggestedTitle.textContent = movie.title;

    const suggestedReleaseYear = document.createElement("p");
    suggestedReleaseYear.classList.add("suggested-info", "suggested-year");
    suggestedReleaseYear.textContent = movie.release_date.slice(0, 4);

    const actorsContainer = document.createElement("div");
    actorsContainer.classList.add("actors-container");

    const firstTwoActors = movie.cast
      .slice(0, 2)
      .map((actor) => actor.name)
      .join(", ");

    const suggestedActors = document.createElement("p");
    suggestedActors.classList.add("suggested-info");
    suggestedActors.textContent = firstTwoActors;

    suggestedMovie.append(suggestedPosterContainer, suggestedDetails);
    suggestedPosterContainer.append(suggestedPoster);
    suggestedDetails.append(
      suggestedTitle,
      suggestedReleaseYear,
      actorsContainer
    );
    actorsContainer.append(suggestedActors);

    liveSearchDropdown.append(suggestedMovie);
  });
};

searchBar.addEventListener("input", () => {
  buildLiveSearch();
});

searchBar.addEventListener("click", () => {
  buildLiveSearch();
});

const closeLiveSearch = () => {
  liveSearchDropdown.replaceChildren();
};

document.addEventListener("click", (e) => {
  if (!liveSearchDropdown.contains(e.target) && e.target !== searchBar) {
    closeLiveSearch();
  }
});
