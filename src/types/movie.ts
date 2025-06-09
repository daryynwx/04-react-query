import type { ReactNode } from "react";

export interface Movie {
    backdrop_path: any;
    release_date: ReactNode;
    vote_average: ReactNode;
    overview: ReactNode;
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
  