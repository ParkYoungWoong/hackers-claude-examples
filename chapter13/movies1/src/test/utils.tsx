import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createMemoryRouter, RouterProvider } from 'react-router'

// 테스트마다 캐시/재시도 없는 새 QueryClient
function makeClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } }
  })
}

// 단일 컴포넌트 렌더 (라우팅 불필요)
export function renderWithClient(ui: ReactElement) {
  return render(
    <QueryClientProvider client={makeClient()}>{ui}</QueryClientProvider>
  )
}

// 라우트 배열과 초기 경로로 렌더 (통합 테스트)
type RouteDef = Parameters<typeof createMemoryRouter>[0]
export function renderWithRouter(routes: RouteDef, initialPath: string) {
  const router = createMemoryRouter(routes, { initialEntries: [initialPath] })
  return render(
    <QueryClientProvider client={makeClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
