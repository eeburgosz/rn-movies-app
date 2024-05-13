import { THE_MOVIE_DB_APIKEY } from '@env';
import { AxiosAdapter } from './http/axios.adapter';

export const movieDBFectcher = new AxiosAdapter({
  baseUrl: 'https://api.themoviedb.org/3/movie',
  params: {
    // api_key: 'ce021991e7b3d8dd1872eacbe4ad6875',
    api_key: THE_MOVIE_DB_APIKEY ?? 'no-key',
    language: 'es',
  },
});
