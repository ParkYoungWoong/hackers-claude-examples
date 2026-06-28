---
paths:
  - 'src/**/*.ts'
  - 'src/**/*.tsx'
---

# 코드 스타일 규칙

들여쓰기, 따옴표, 세미콜론, 줄바꿈 같은 포맷은 Prettier(`npm run format`)가 자동으로 처리한다. 이 문서는 **Prettier가 잡지 못하는** 구조와 네이밍만 다룬다.

## import

- 순서: 외부 패키지 → 내부 모듈(상대 경로) 순으로 둔다.
- 타입만 가져올 때는 `import type { Todo } from './types'`처럼 `import type`을 쓴다.
- 사용하지 않는 import는 남기지 않는다(ESLint가 잡는다).

## 네이밍

- 컴포넌트와 그 파일명은 PascalCase: `TodoList`, `TodoList.tsx`.
- 함수/변수는 camelCase. 불리언은 `is`/`has`로 시작: `isSaving`.
- 이벤트 핸들러는 `handle`로 시작: `handleSubmit`. 컴포넌트가 받는 콜백 prop은 `on`으로 시작: `onDelete`, `onToggle`.
- CSS 클래스는 BEM을 따른다: `block`, `block__element`, `block--modifier` (예: `todo-item`, `todo-item--done`, `btn__icon`).

## 컴포넌트 구조

- 한 파일에 한 컴포넌트. 컴포넌트는 default export.
- Props 타입은 파일 상단에 로컬 `type Props`로 선언한다. 여러 곳에서 공유하는 도메인 타입만 `src/types.ts`에 둔다.
- 새 클릭 버튼은 직접 `<button>`을 만들지 말고 `src/components/Button.tsx`를 재사용한다.
