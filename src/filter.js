import { getFilters, saveFilters, getBookmarks } from "./localStorage.js";
import { renderBookmarks } from "./render.js";

const setSortBy = document.getElementById("sort-by");

const minPopSlider = document.getElementById("min-popularity");
const minPopValue = document.getElementById("min-pop-value");

// const filters = getFilters();
// setSortBy.value = filters.sortType;

const filters = getFilters();
setSortBy.value = filters.sortType || "";
minPopSlider.value = filters.minPopularity || 0;
minPopValue.textContent = filters.minPopularity || 0;

setSortBy.addEventListener("change", (e) => {
  filters.sortType = e.target.value;
  saveFilters(filters);
  renderBookmarks(getBookmarks());
});

export const sortBookmarks = (bookmarks, sortType) => {
  return bookmarks.slice().sort((a, b) => {
    if (sortType === "most-popular") return b.popularity - a.popularity;
    if (sortType === "least-popular") return a.popularity - b.popularity;
    if (sortType === "alpha-asc") return a.title.localeCompare(b.title);
    if (sortType === "alpha-desc") return b.title.localeCompare(a.title);
    return 0;
  });
};

minPopSlider.addEventListener("input", (e) => {
  const value = Number(e.target.value);
  minPopValue.textContent = value;
  filters.minPopularity = value;
  saveFilters(filters);
  renderBookmarks(getBookmarks());
});
