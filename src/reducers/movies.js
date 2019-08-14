import { DISCOVERY_MOVIES, MOVIE_DETAILS } from '../actions/movies';

const initialState = {
  discoveryMovies: [],
  discoveryMoviesError: null,
  movieDetails: {},
  movieDetailsError: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case DISCOVERY_MOVIES: {
      return {
        ...state,
        discoveryMovies: payload.data || [],
        discoveryMoviesError: payload.error || null,
      };
    }

    case MOVIE_DETAILS: {
      return {
        ...state,
        movieDetails: payload.data || {},
        movieDetailsError: payload.error || null,
      };
    }

    default: {
      return state;
    }
  }
}
