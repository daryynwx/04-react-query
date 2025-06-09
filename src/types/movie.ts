export interface Movie {
    id: number;
    title: string;
    poster_path: string;
  }
  
  export interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
  