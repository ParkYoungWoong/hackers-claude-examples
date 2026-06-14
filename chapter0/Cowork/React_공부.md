# React 공부 메모
시작일: 2024-07-01

## useState vs useReducer 언제 쓸까?
- useState: 단순 값 하나 (toggle, input value)
- useReducer: 여러 상태가 연관되거나 로직 복잡할 때

## useEffect 의존성 배열
- []: 마운트 시 한 번만
- [value]: value 바뀔 때마다
- 없음: 매 렌더마다 (거의 안 씀)
- cleanup 함수 반환으로 메모리 누수 방지

## 커스텀 훅 패턴
반복되는 로직은 use로 시작하는 커스텀 훅으로 추출
예: useFetch, useDebounce, useLocalStorage

## 성능 최적화
- React.memo: props 안 바뀌면 리렌더 스킵
- useMemo: 계산 결과 캐시
- useCallback: 함수 레퍼런스 캐시
- 근데 너무 일찍 최적화하면 오히려 복잡해짐

## 폴더 구조 (내가 쓰는 방식)
src/
  components/  - 재사용 UI 컴포넌트
  pages/       - 라우트별 페이지
  hooks/       - 커스텀 훅
  utils/       - 순수 함수 유틸
  store/       - 전역 상태

## 다음에 공부할 것
- React Query (서버 상태 관리)
- Zustand (클라이언트 상태)
- Next.js App Router
