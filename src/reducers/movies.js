import { DISCOVERY_MOVIES } from '../actions/movies';

const initialState = {
  discoveryMovies: [],
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case DISCOVERY_MOVIES: {
      return {
        ...state,
        discoveryMovies: payload,
      };
    }

    default: {
      return state;
    }
  }
}
