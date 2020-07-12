import { FETCH_MOVIES_SUCCESS, FETCH_MOVIES_FAILURE, FETCH_MOVIES_REQUEST } from '../types';

const initialState = {
    movieList: [],
    isLoading: false
}

export const moviesReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_MOVIES_REQUEST:            
            return {movieList: [], isLoading: true};
        case FETCH_MOVIES_SUCCESS:            
            return {movieList: action.payload, isLoading: false};
        case FETCH_MOVIES_FAILURE:            
            return {movieList: [], isLoading: false};
        default: 
            return {...state}
        
    }
}