export interface MovieSummary {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface SearchResponse {
  Search?: MovieSummary[]
  totalResults?: string
  Response: 'True' | 'False'
  Error?: string
}

export interface MovieDetail {
  Title: string
  Year: string
  Rated: string
  Runtime: string
  Genre: string
  Director: string
  Actors: string
  Plot: string
  Poster: string
  imdbRating: string
  imdbID: string
  Type: string
  Response: 'True' | 'False'
  Error?: string
}
