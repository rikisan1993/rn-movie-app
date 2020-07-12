import { combineReducers } from 'redux'
import { authReducer } from './auth-reducer';
import { moviesReducer } from './movies-reducer';
import { movieReducer } from './movie-reducer';

export default combineReducers({
    auth: authReducer,
    movies: moviesReducer,
    movie: movieReducer
})
