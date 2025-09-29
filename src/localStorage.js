import { renderBookmarks } from "./render.js";

const deleteBookmarksBtn = document.getElementById("delete-bookmarks");

let movies = [];

deleteBookmarksBtn.addEventListener("click", () => {
  movies = [];
  localStorage.setItem("movies", JSON.stringify(movies));
  renderBookmarks(movies);
});

export const saveBookmarks = () => {
  localStorage.setItem("movies", JSON.stringify(movies));
};

export const getBookmarks = () => {
  const bookmarkedMovies = localStorage.getItem("movies");
  if (bookmarkedMovies) {
    movies = JSON.parse(bookmarkedMovies);
    renderBookmarks(movies);
  }
  return movies;
};

export const saveFilters = (filters) =>
  localStorage.setItem("filters", JSON.stringify(filters));

export const getFilters = () =>
  JSON.parse(localStorage.getItem("filters")) || { sortType: "" };

export const bookmarkButton = (title, popularity) => {
  const bookmarkBtn = document.createElement("button");
  bookmarkBtn.classList.add("bookmark-button");
  bookmarkBtn.textContent = "Favorite";

  bookmarkBtn.addEventListener("click", () => {
    const movieObj = { title, popularity };
    const alreadyBookmarked = movies.some((m) => m.title === movieObj.title);
    if (!alreadyBookmarked) {
      console.log(movieObj);
      movies.push(movieObj);
      saveBookmarks();
      renderBookmarks(movies);
    } else {
      alert(`${title} is already in bookmarks`);
    }
  });

  return bookmarkBtn;
};
