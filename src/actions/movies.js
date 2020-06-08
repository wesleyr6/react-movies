import { APIResquest } from "../utils/api";

export function getDiscoveryMovies() {
  return APIResquest({
    uri: "discover/movie",
    method: "GET",
    params: {
      sort_by: "popularity.desc",
    },
  });
}

export function getMovieDetails(movieID) {
  return APIResquest({
    uri: `movie/${movieID}`,
    method: "GET",
  });
}
