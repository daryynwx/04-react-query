export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
  }
  
  export interface MoviesResponse {
    results: Movie[];
    total_pages: number;
  }
  