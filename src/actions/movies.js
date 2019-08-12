import { APIResquest } from '../utils/api';

export const DISCOVERY_MOVIES = 'DISCOVERY_MOVIES';

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
        payload: res.results,
      });
    }).catch(err => dispatch({
      type: DISCOVERY_MOVIES,
      payload: err,
    }));
  };
}
