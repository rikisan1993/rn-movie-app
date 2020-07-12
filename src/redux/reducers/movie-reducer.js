import { FETCH_MOVIE_SUCCESS, FETCH_MOVIE_FAILURE, FETCH_MOVIE_REQUEST } from '../types';
import { base_url } from '../../constants';

const initialState = {
    casts: [],
    crews: [],
    movie: null,
    isLoading: false
}

const getProfileURI = path => {        
    return `${base_url}w185${path}`
}

const getPosterURI = path => {
    return `${base_url}w342${path}`
}

const getReleaseYear = date => {
    return `(${date.split('-')[0]})`;
}

const getBackdropURI = path => {        
    return `${base_url}w1280${path}`
}

const mapProfileURI = list => {
    return [...list].map(item => {
        item.profile_uri = getProfileURI(item.profile_path);
        return item;
    })
}

const setMovieState = action => {
    const { cast, crew, movie } = action.payload;
    const casts = mapProfileURI(cast.filter(item => !!item.profile_path));
    const crews = mapProfileURI(crew.filter(item => !!item.profile_path));
    movie.backdrop_uri = getBackdropURI(movie.backdrop_path);
    movie.releaseYear = getReleaseYear(movie.release_date);
    movie.poster_uri = getPosterURI(movie.poster_path);
    movie.genres = movie.genres.map(genre => genre.name)
    return { casts, crews, movie, isLoading: false};
}

export const movieReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_MOVIE_REQUEST:
            return {...state, isLoading: true};
        case FETCH_MOVIE_SUCCESS:
            return setMovieState(action);
        case FETCH_MOVIE_FAILURE:
            return {...state, isLoading: false};
        default:
            return {...state}
    }
}