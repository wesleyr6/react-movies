import { APIResquest } from "../utils/api";

export function getSearchedMovies(movie) {
  return APIResquest({
    uri: "search/movie",
    method: "GET",
    params: {
      query: movie,
    },
  });
}
