import { buildPage } from "./buildPage.js";
import { sortBookmarks } from "./filter.js";
import { getFilters } from "./localStorage.js";

const bookmarksList = document.getElementById("bookmarks-list");

export const renderPage = async (movie) => {
  buildPage(movie);
};

export const renderBookmarks = (bookmarks) => {
  bookmarksList.replaceChildren();
  const filters = getFilters();

  const filtered = bookmarks.filter(
    (movie) => (movie.popularity || 0) >= (filters.minPopularity || 0)
  );
  const sorted = sortBookmarks(filtered, filters.sortType);

  sorted.forEach((movie) => {
    const li = document.createElement("li");
    li.textContent = movie.title;
    bookmarksList.append(li);
  });
};
