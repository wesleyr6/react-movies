import { APIResquest } from '../utils/api';

export const SEARCHED_MOVIES = 'SEARCHED_MOVIES';

export function getSearchedMovies(movie) {
  return (dispatch) => {
    APIResquest({
      uri: 'search/movie',
      method: 'GET',
      params: {
        query: movie,
      },
    }).then((res) => {
      dispatch({
        type: SEARCHED_MOVIES,
        payload: {
          keyword: movie,
          movies: res.results,
        },
      });
    }).catch(err => dispatch({
      type: SEARCHED_MOVIES,
      payload: {
        keyword: movie,
        error: err,
      },
    }));
  };
}
