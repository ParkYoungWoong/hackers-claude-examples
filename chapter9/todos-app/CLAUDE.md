# CLAUDE.md

## 명령어

- `npm run dev` — HMR이 적용된 Vite 개발 서버를 실행한다.
- `npm run build` — `tsc -b`로 프로젝트 레퍼런스 기반 타입 체크를 먼저 수행한 뒤 Vite 프로덕션 빌드를 만든다. 타입 에러가 있으면 빌드는 실패한다.
- `npm run lint` — 저장소 전체에 ESLint를 실행한다.
- `npm run preview` — 빌드된 `dist/`를 로컬에서 미리 본다.

테스트 러너는 설정되어 있지 않다.

## 아키텍처

- Vite + React 19 + TypeScript 기반의 SPA이다. 진입점은 `src/main.tsx`이며, `index.html`의 `#root`에 `<App />`(`src/App.tsx`)을 `<StrictMode>`로 감싸 마운트한다.
- 현재 `App.tsx`가 todo 상태를 컴포넌트 로컬 `useState`로 모두 보관한다. 라우터, 전역 스토어, 영속 계층, 백엔드가 모두 없다. 사용자가 구조 도입을 명시적으로 요청하지 않는 한 새 기능도 이 단일 컴포넌트 모델 안에서 구현한다.
- UI 문자열은 한국어다(예: `할 일 목록`). 사용자에게 노출되는 텍스트를 수정할 때는 한국어를 유지한다.
- TypeScript는 프로젝트 레퍼런스 구조를 사용한다. `tsconfig.json`은 솔루션 파일이며 `tsconfig.app.json`(`src/` 아래 앱 코드)과 `tsconfig.node.json`(Vite/툴링)을 가리킨다. 컴파일러 옵션을 바꿀 때는 해당 파일을 정확히 골라 수정한다.
- ESLint는 플랫 설정(`eslint.config.js`)을 사용하며 `@eslint/js` recommended, `typescript-eslint` recommended, `eslint-plugin-react-hooks` recommended-latest, `eslint-plugin-react-refresh` vite 프리셋을 확장한다. `dist`는 전역 ignore 대상이다.
