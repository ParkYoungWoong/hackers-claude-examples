import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { server } from './msw/server'

// 테스트용 API 키 고정 (실제 .env에 의존하지 않음)
vi.stubEnv('VITE_OMDB_API_KEY', 'test-key')

// jsdom에 없는 IntersectionObserver 모킹 (콜백을 보관해 테스트에서 교차를 수동 트리거)
class IntersectionObserverMock {
  static instances: IntersectionObserverMock[] = []
  callback: IntersectionObserverCallback
  constructor(cb: IntersectionObserverCallback) {
    this.callback = cb
    IntersectionObserverMock.instances.push(this)
  }
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [])
  root = null
  rootMargin = ''
  thresholds = []
  trigger() {
    this.callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    )
  }
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
;(
  globalThis as unknown as {
    IntersectionObserverMock: typeof IntersectionObserverMock
  }
).IntersectionObserverMock = IntersectionObserverMock

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => {
  server.resetHandlers()
  IntersectionObserverMock.instances.length = 0
})
afterAll(() => server.close())
