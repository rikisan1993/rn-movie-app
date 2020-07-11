import * as Config from '../config';

const apikey = Config.MOVIE_API_KEY;
export const getMovieDetail = movieID => `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apikey}`;
export const getCredits = movieID => `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apikey}`;
export const getMovies = () => `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}`;
export const getConfig = () => `https://api.themoviedb.org/3/configuration?api_key=${apikey}`;
export const getGenres = () => `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}`;

export const base_url = 'http://image.tmdb.org/t/p/';
export const secure_base_url = 'https://image.tmdb.org/t/p/';

export const genres = [
    {
       "id":28,
       "name":"Action"
    },
    {
       "id":12,
       "name":"Adventure"
    },
    {
       "id":16,
       "name":"Animation"
    },
    {
       "id":35,
       "name":"Comedy"
    },
    {
       "id":80,
       "name":"Crime"
    },
    {
       "id":99,
       "name":"Documentary"
    },
    {
       "id":18,
       "name":"Drama"
    },
    {
       "id":10751,
       "name":"Family"
    },
    {
       "id":14,
       "name":"Fantasy"
    },
    {
       "id":36,
       "name":"History"
    },
    {
       "id":27,
       "name":"Horror"
    },
    {
       "id":10402,
       "name":"Music"
    },
    {
       "id":9648,
       "name":"Mystery"
    },
    {
       "id":10749,
       "name":"Romance"
    },
    {
       "id":878,
       "name":"Science Fiction"
    },
    {
       "id":10770,
       "name":"TV Movie"
    },
    {
       "id":53,
       "name":"Thriller"
    },
    {
       "id":10752,
       "name":"War"
    },
    {
       "id":37,
       "name":"Western"
    }
 ]