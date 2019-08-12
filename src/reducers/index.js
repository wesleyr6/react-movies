import { combineReducers } from 'redux';
import moviesReducer from './movies';
import searchReducer from './search';

export default combineReducers({
  movies: moviesReducer,
  search: searchReducer,
});
