import { useEffect, useState } from 'react';
import * as UseCases from '../../core/use-cases';
import { movieDBFectcher } from '../../config/adapters/movieDB.adapter';
import type { Movie } from '../../core/entities/movie.entity';

let popularPageNumber = 1;

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    const nowPlayingMoviesPromise = await UseCases.moviesNowPlayingUseCase(
      movieDBFectcher,
    );
    const popularMoviesPromise = await UseCases.moviesPopularUseCase(
      movieDBFectcher,
    );
    const topRatedMoviesPromise = await UseCases.moviesTopRatedUseCase(
      movieDBFectcher,
    );
    const upcomingMoviesPromise = await UseCases.moviesUpcomingUseCase(
      movieDBFectcher,
    );

    const [nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies] =
      await Promise.all([
        nowPlayingMoviesPromise,
        popularMoviesPromise,
        topRatedMoviesPromise,
        upcomingMoviesPromise,
      ]);

    setNowPlaying(nowPlayingMovies);
    setPopular(popularMovies);
    setTopRated(topRatedMovies);
    setUpcoming(upcomingMovies);

    setIsLoading(false);
  };

  return {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,

    //Methods
    popularNextPage: async () => {
      popularPageNumber++;
      const popularMovies = await UseCases.moviesPopularUseCase(
        movieDBFectcher,
        {
          page: popularPageNumber,
        },
      );
      setPopular(prev => [...prev, ...popularMovies]);
    },
  };
};
