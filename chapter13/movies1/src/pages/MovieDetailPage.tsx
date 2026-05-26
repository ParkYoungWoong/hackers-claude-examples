import { Link, useParams } from 'react-router'
import { useMovieDetail } from '@/hooks/useMovieDetail'
import { Loader, ErrorMessage } from '@/components/StateView'

const PLACEHOLDER = 'https://placeholder.co/300x450?text=No+Image'

export function MovieDetailPage() {
  const { imdbID = '' } = useParams()
  const { data, isLoading, isError } = useMovieDetail(imdbID)

  if (isLoading) return <Loader />
  if (isError || !data || data.Response === 'False') {
    return (
      <div>
        <ErrorMessage message="상세 정보를 불러오지 못했습니다" />
        <Link to="/">목록으로</Link>
      </div>
    )
  }

  const poster = data.Poster === 'N/A' ? PLACEHOLDER : data.Poster

  return (
    <div>
      <Link to="/">목록으로</Link>
      <img src={poster} alt={data.Title} />
      <h1>{data.Title}</h1>
      <p>{data.Year} / {data.Rated} / {data.Runtime}</p>
      <p>{data.Genre}</p>
      <p>감독: {data.Director}</p>
      <p>출연: {data.Actors}</p>
      <p>{data.Plot}</p>
      <p>IMDb {data.imdbRating}</p>
    </div>
  )
}
