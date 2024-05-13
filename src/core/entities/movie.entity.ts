export interface Movie {
  id: number;
  title: string;
  description: string; //! En la info que traigo de la web llega como "overview"
  releaseDate: Date;
  rating: number;
  poster: string; //! En la info que traigo de la web llega como "poster_path"
  backdrop: string; //! En la info que traigo de la web llega como "backdrop_path"
}

export interface FullMovie extends Movie {
  genres: string[];
  duration: number;
  budget: number;
  originalTitle: string;
  productionCompanies: string[];
}
