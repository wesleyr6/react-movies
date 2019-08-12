import { SEARCHED_MOVIES } from '../actions/search';

const initialState = {
  keyword: null,
  searchedMovies: [],
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SEARCHED_MOVIES: {
      return {
        ...state,
        keyword: payload.keyword || null,
        searchedMovies: payload.movies || [],
        error: payload.error || null,
      };
    }

    default: {
      return state;
    }
  }
}
