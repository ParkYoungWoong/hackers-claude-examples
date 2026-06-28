# CLAUDE.md

## 명령어

- `npm run dev` — HMR이 적용된 Vite 개발 서버를 실행한다.
- `npm run build` — `tsc -b`로 프로젝트 레퍼런스 기반 타입 체크를 먼저 수행한 뒤 Vite 프로덕션 빌드를 만든다. 타입 에러가 있으면 빌드는 실패한다.
- `npm run lint` — 저장소 전체에 ESLint를 실행한다(Prettier 규칙 포함).
- `npm run format` — Prettier로 저장소 전체를 포맷한다(`prettier --write .`).
- `npm run typecheck` — `tsc -b --noEmit`로 타입만 검사한다.
- `npm run test` — vitest로 테스트를 1회 실행한다(`vitest run`).
- `npm run preview` — 빌드된 `dist/`를 로컬에서 미리 본다.

테스트는 vitest + `@testing-library/react`를 사용한다(`npm run test`). 작성 규칙은 `.claude/rules/testing.md`를 따른다.

## 아키텍처

- Vite + React 19 + TypeScript 기반의 SPA이다. 진입점은 `src/main.tsx`이며, `index.html`의 `#root`에 `<App />`(`src/App.tsx`)을 `<StrictMode>`로 감싸 마운트한다.
- 현재 `App.tsx`가 todo 상태를 컴포넌트 로컬 `useState`로 모두 보관한다. 라우터, 전역 스토어, 영속 계층, 백엔드가 모두 없다. 사용자가 구조 도입을 명시적으로 요청하지 않는 한 새 기능도 이 단일 컴포넌트 모델 안에서 구현한다.
- UI 문자열은 한국어다(예: `할 일 목록`). 사용자에게 노출되는 텍스트를 수정할 때는 한국어를 유지한다.
- TypeScript는 프로젝트 레퍼런스 구조를 사용한다. `tsconfig.json`은 솔루션 파일이며 `tsconfig.app.json`(`src/` 아래 앱 코드)과 `tsconfig.node.json`(Vite/툴링)을 가리킨다. 컴파일러 옵션을 바꿀 때는 해당 파일을 정확히 골라 수정한다.
- ESLint는 플랫 설정(`eslint.config.js`)을 사용하며 `@eslint/js` recommended, `typescript-eslint` recommended, `eslint-plugin-react-hooks`의 `flat.recommended`, `eslint-plugin-react-refresh` vite 프리셋, `eslint-plugin-prettier`(Prettier 규칙을 lint로 통합)를 확장한다. `dist`는 전역 ignore 대상이다.
- 코드 포맷은 Prettier(`.prettierrc`)가 담당한다. 파일을 편집하면 `.claude/settings.json`의 PostToolUse 훅이 `npm run format`/`lint`/`typecheck`를 자동 실행한다(`.prettierignore`로 `dist`/`node_modules`/`.agents` 등은 제외).

## 기능 개발 규칙

새 기능을 구현할 때 아래 규칙을 그대로 따른다. 이 규칙들은 "구현 방식이 갈릴 수 있는 지점"을 하나의 정답으로 고정해, 누가 구현해도 같은 구조가 나오도록 한다. 규칙과 충돌하는 더 나은 방법이 떠올라도 임의로 바꾸지 말고, 규칙을 먼저 따른 뒤 개선이 필요하면 제안만 한다.

이 섹션은 **todo 기능 구현에서 갈리는 결정**만 고정한다. 코드 스타일/네이밍/보안/테스트 같은 일반 규칙은 `.claude/rules/`(`code-style.md`, `security.md`, `testing.md`)에 있으며 세션 시작 시 자동 로드된다.

- **클릭 액션 요소**: 클릭으로 동작하는 버튼(삭제 등)은 raw `<button>`을 직접 쓰지 않고 항상 `src/components/Button.tsx`를 사용한다. 삭제 버튼은 `variant="danger"`, `size="small"`, `icon="delete"`로 만든다. (`icon`은 Material Icons 이름 문자열이다.)
- **완료 토글 UI**: 완료 상태 전환은 별도 버튼이 아니라 할 일 텍스트(`<li>` 안의 텍스트 영역)를 클릭해서 한다. 완료된 항목은 `todo-item--done` 클래스를 추가해 취소선(`text-decoration: line-through`)으로 표시한다.
- **도메인 타입**: `Todo` 같은 도메인 타입은 `src/types.ts`에 둔다. 완료 상태가 필요하면 `Todo`에 `completed: boolean` 필드를 추가하고, 새 할 일은 `completed: false`로 생성한다.
- **컴포넌트 Props 타입**: 각 컴포넌트 파일 상단에 `type Props = { ... }`로 로컬 선언한다(`TodoForm.tsx`, `TodoList.tsx` 패턴). 도메인 타입처럼 여러 곳에서 공유하는 타입만 `types.ts`로 보낸다.
- **콜백 네이밍**: 삭제 콜백은 `onDelete(id: string)`, 완료 토글 콜백은 `onToggle(id: string)`으로 고정한다. 이름을 `onRemove`, `onComplete`, `onCheck` 등으로 바꾸지 않는다.
- **상태 변경 위치**: todo 상태와 변경 로직은 `App.tsx` 안에 인라인으로 둔다(단일 컴포넌트 모델). 커스텀 훅이나 전역 스토어로 분리하지 않는다. 상태는 항상 불변으로 갱신한다(삭제는 `filter`, 토글/수정은 `map`).
- **export 방식**: 컴포넌트는 기존대로 default export 한다. named export로 바꾸지 않는다.
- **UI 문자열**: 사용자에게 보이는 텍스트는 한국어로 작성한다(삭제 버튼 `aria-label`은 `"삭제"` 등).
