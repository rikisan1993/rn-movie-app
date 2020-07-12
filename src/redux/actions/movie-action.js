import { FETCH_MOVIE_SUCCESS, FETCH_MOVIE_FAILURE, FETCH_MOVIE_REQUEST } from '../types';
import { getCredits, getMovieDetail } from '../../constants';

export const fetchMovieRequest = () => ({ type: FETCH_MOVIE_REQUEST });
export const fetchMovieFailure = err => ({ type: FETCH_MOVIE_FAILURE, payload: err});
export const fetchMovieSuccess = data => ({ type: FETCH_MOVIE_SUCCESS, payload: data});


export const fetchMovie = ({id}) => async dispatch => {
    try {
        dispatch(fetchMovieRequest());
        const promises = [
            fetch(getMovieDetail(id)).then(res => res.json()), 
            fetch(getCredits(id)).then(res => res.json())
        ]
        const [ movie, {cast, crew} ] = await Promise.all(promises);
        dispatch(fetchMovieSuccess({ movie, cast, crew }))
    } catch(err) {
        dispatch(fetchMovieFailure(err))
    }
}