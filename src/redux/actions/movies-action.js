import { FETCH_MOVIES_SUCCESS, FETCH_MOVIES_FAILURE, FETCH_MOVIES_REQUEST } from '../types';
import { getMovies, genres, base_url } from '../../constants';

export const fetchMoviesRequest = () => ({ type: FETCH_MOVIES_REQUEST })
export const fetchMoviesFailure = err => ({ type: FETCH_MOVIES_FAILURE, payload: err })
export const fetchMoviesSuccess = movies => ({ type: FETCH_MOVIES_SUCCESS, payload: movies })

const genreMap = {};
for(let i = 0; i < genres.length; i++) {
    genreMap[genres[i].id] = genres[i].name;
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

const mapPosterURI = list => {
    return list.map(movie => {
        movie.poster_uri = getPosterURI(movie.poster_path);
        return movie;
    })
}

const mapReleaseYear = list => {
    return list.map(movie => {
        movie.releaseYear = getReleaseYear(movie.release_date)
        return movie
    })
}

const mapMovieGenres = ({results: list}) => {
    return list.map(movie => {
        movie.genres = movie.genre_ids.map(id => genreMap[id]);
        return movie;
    })
}

const mapBackdropPath = list => {
    return list.map(movie => {
        movie.backdrop_uri = getBackdropURI(movie.backdrop_path);
        return movie;
    })
}

export const fetchMovies = () => {
    return dispatch => {
        dispatch(fetchMoviesRequest());
        fetch(getMovies())
            .then(res => res.json())
            .then(mapMovieGenres)
            .then(mapReleaseYear)
            .then(mapPosterURI)
            .then(mapBackdropPath)
            .then(res => dispatch(fetchMoviesSuccess(res)))
            .catch(err => {
                dispatch(fetchMoviesFailure(err))
            })
    }
}