import type { MovieDetail, SearchResponse } from '@/types/movie'

const BASE_URL = 'https://www.omdbapi.com/'
const API_KEY = import.meta.env.VITE_OMDB_API_KEY

export async function searchMovies(
  query: string,
  page: number
): Promise<SearchResponse> {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`검색 요청 실패: ${res.status}`)
  return res.json()
}

export async function getMovieDetail(imdbID: string): Promise<MovieDetail> {
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`상세 요청 실패: ${res.status}`)
  return res.json()
}
