---
name: tested-component
description: 새 React 컴포넌트(.tsx) 파일을 만들 때 사용한다. 위치와 무관하게 컴포넌트를 코드 스타일 규칙대로 생성하고, 테스트가 필요한지 판단해 필요하면 같은 폴더에 *.test.tsx를 동반 작성한다.
when_to_use: 새 컴포넌트 파일을 만들 때(어느 폴더든, 예시 "할 일 항목 컴포넌트 만들어줘", "TodoItem 분리해줘") 사용한다. 기존 컴포넌트 수정만 하는 경우에는 사용하지 않는다.
allowed-tools: Read Grep Glob Edit Write Bash(npm run *)
model: sonnet
metadata:
  - author: ParkYoungWoong
  - version: 1.0.0
---

# tested-component

새 컴포넌트를 만들 때 **구조를 규칙대로 맞추고, 테스트 필요성을 판단해 동반 작성**하기 위한 워크플로우다. "컴포넌트는 만들었는데 테스트는 빠지는" 누락을 생성 시점에 막는다. 컴포넌트를 어느 폴더에 두든(`src/components`, `src`, 기능별 폴더 등) 동일하게 적용한다.

## 워크플로우

1. **컴포넌트 생성** - `.claude/rules/code-style.md`를 따른다.
   - default export, 한 파일 한 컴포넌트.
   - Props 타입은 파일 상단에 로컬 `type Props`로 선언(도메인 타입만 `src/types.ts`).
   - 클릭 액션 버튼은 직접 `<button>`을 만들지 말고 `src/components/Button.tsx`를 재사용.
   - CSS 클래스는 BEM, 사용자 노출 문자열은 한국어.

2. **테스트 필요성 판단** - 아래 기준으로 정한다.
   - **필요**: 동작이 있는 컴포넌트. `useState`/`useReducer`, 이벤트 핸들러, 조건부 렌더, 입력 검증·변환, 비동기 처리 중 하나라도 있으면 테스트를 쓴다. (예: `TodoForm`)
   - **생략 가능**: props를 받아 그대로 마크업에 꽂기만 하는 순수 표시 컴포넌트. 이때는 테스트를 생략하되 **생략한 이유를 한 줄 보고**한다. (예: 현재 `TodoList`)

3. **테스트 작성** - 필요로 판단되면 컴포넌트와 **같은 폴더**에 `<이름>.test.tsx`를 만들고 `.claude/rules/testing.md`를 따른다.
   - vitest + @testing-library/react, 요소는 role/text로 찾고, 상호작용은 `@testing-library/user-event`로.
   - 사용자 관점의 동작을 검증한다(구현 세부가 아니라 "보인다/사라진다/호출된다").

4. **검증** - 테스트를 썼으면 `npm run test`로 전부 통과하는지 확인한다. 통과할 때까지 고친다.

5. **보고** - 만든 컴포넌트, 테스트 작성/생략 여부와 그 이유를 간결히 보고한다. 부모에서 import해 연결하는 작업은 이 스킬 범위 밖이며, 필요하면 별도로 진행한다.

## 하지 말 것

- 테스트 필요성 판단을 건너뛰고 "일단 컴포넌트만" 만들고 끝내지 않는다. 판단은 항상 한다.
- 단순 컴포넌트라고 자의로 단정하지 않는다. 동작이 하나라도 있으면 테스트를 쓴다.
- 요청하지 않은 기능이나 props를 덧붙이지 않는다.
