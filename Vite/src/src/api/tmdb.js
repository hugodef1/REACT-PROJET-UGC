const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = 'https://api.themoviedb.org/3';
const IMG = 'https://image.tmdb.org/t/p';

const get = (url) =>
  fetch(`${BASE}${url}${url.includes('?') ? '&' : '?'}api_key=${API_KEY}&language=fr-FR`)
    .then((r) => r.json());

export const getPosterUrl = (path, size = 'w342') =>
  path ? `${IMG}/${size}${path}` : 'https://via.placeholder.com/342x513/162040/8ba3c7?text=No+Image';

export const getBackdropUrl = (path, size = 'w780') =>
  path ? `${IMG}/${size}${path}` : null;

export const getNowPlaying = (page = 1) =>
  get(`/movie/now_playing?region=FR&page=${page}`);

export const getPopular = (page = 1) =>
  get(`/movie/popular?region=FR&page=${page}`);

export const getTopRated = () => get('/movie/top_rated?region=FR');

export const getUpcoming = () => get('/movie/upcoming?region=FR');

export const searchMovies = (query, page = 1) =>
  get(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);

export const getMovieDetails = (id) =>
  get(`/movie/${id}?append_to_response=credits,videos,similar`);

export const getMoviesByGenre = (genreId, page = 1) =>
  get(`/discover/movie?with_genres=${genreId}&region=FR&sort_by=popularity.desc&page=${page}`);

// Genres utiles
export const GENRES = {
  FAMILLE: 10751,
  ACTION: 28,
  COMEDIE: 35,
  DRAME: 18,
  HORREUR: 27,
  ANIMATION: 16,
};
