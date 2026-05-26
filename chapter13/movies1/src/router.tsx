import { createBrowserRouter } from 'react-router'
import { HomePage } from '@/pages/HomePage'
import { MovieDetailPage } from '@/pages/MovieDetailPage'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/movie/:imdbID', element: <MovieDetailPage /> }
])
