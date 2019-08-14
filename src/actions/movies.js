import { APIResquest } from '../utils/api';

export const DISCOVERY_MOVIES = 'DISCOVERY_MOVIES';
export const MOVIE_DETAILS = 'MOVIE_DETAILS';


export function getDiscoveryMovies() {
  return (dispatch) => {
    APIResquest({
      uri: 'discover/movie',
      method: 'GET',
      params: {
        sort_by: 'popularity.desc',
      },
    }).then((res) => {
      dispatch({
        type: DISCOVERY_MOVIES,
        payload: {
          data: res.results,
          error: null,
        },
      });
    }).catch(err => dispatch({
      type: DISCOVERY_MOVIES,
      payload: {
        error: err,
      },
    }));
  };
}

export function getMovieDetails(movieID) {
  return (dispatch) => {
    APIResquest({
      uri: `movie/${movieID}`,
      method: 'GET',
    }).then((res) => {
      dispatch({
        type: MOVIE_DETAILS,
        payload: {
          data: res,
        },
      });
    }).catch(err => dispatch({
      type: MOVIE_DETAILS,
      payload: {
        error: err,
      },
    }));
  };
}
