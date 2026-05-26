import { useSearchParams } from 'react-router'
import { useMovieSearch } from '@/hooks/useMovieSearch'
import { SearchForm } from '@/components/SearchForm'
import { MovieList } from '@/components/MovieList'
import { Loader, ErrorMessage, EmptyState } from '@/components/StateView'

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('s') ?? ''

  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = useMovieSearch(query)

  const movies = data?.pages.flatMap(p => p.Search ?? []) ?? []
  const noResult =
    query.length > 0 && !isLoading && movies.length === 0

  return (
    <div>
      <SearchForm
        initialQuery={query}
        onSearch={q => setSearchParams({ s: q })}
      />

      {query.length === 0 && <EmptyState message="검색어를 입력하세요" />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage message="검색 중 문제가 발생했습니다" />}
      {noResult && <EmptyState message="검색 결과가 없습니다" />}

      {movies.length > 0 && (
        <MovieList
          movies={movies}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={fetchNextPage}
        />
      )}
    </div>
  )
}
