---
name: implement-feature
description: todos-app에 새 기능(할 일 삭제, 완료 토글 등)을 구현할 때 사용한다. CLAUDE.md의 기능 개발 규칙을 로드해 정해진 구조로 구현하고, 검증 훅을 통과시킨 뒤 규칙 준수를 스스로 점검한다.
when_to_use: 사용자가 todos-app에 기능 추가/변경을 요청할 때(예시 "삭제 기능 추가", "완료 체크 만들어줘") 사용한다. 단순 질문이나 버그 조사에는 사용하지 않는다.
allowed-tools: Read Grep Glob Edit Write Bash(npm run *)
model: opus
metadata:
  - author: ParkYoungWoong
  - version: 1.0.0
---

# implement-feature

todos-app에서 기능을 **항상 같은 구조로** 구현하기 위한 워크플로우다. 구현 방식이 갈릴 수 있는 지점을 규칙으로 좁혀, 누가 실행해도 동일한 결과가 나오게 한다.

## 워크플로우

아래 순서를 그대로 따른다.

1. **규칙 로드**: `CLAUDE.md`의 "기능 개발 규칙" 섹션을 먼저 읽는다. 이 섹션이 모든 구현 결정의 기준이다.

2. **영향 파일 파악**: 보통 다음을 건드린다.
   - `src/types.ts` - 도메인 타입(완료 상태 등 필드 추가)
   - `src/App.tsx` - 상태와 변경 로직(인라인, 불변 갱신)
   - `src/components/TodoList.tsx` - 항목 렌더링, 콜백 연결
   - `src/components/Button.tsx` - 클릭 액션 버튼(직접 만들지 말고 재사용)

   필요한 파일만 읽고, 기존 패턴(default export, 로컬 `type Props`)을 따른다.

3. **규칙대로 구현**: 특히 아래를 지킨다.
   - 클릭 버튼은 `Button.tsx` 사용(삭제는 `variant="danger" size="small" icon="delete"`).
   - 완료 토글은 텍스트 클릭 + `todo-item--done` 취소선.
   - 콜백은 `onDelete(id: string)`, `onToggle(id: string)`로 고정.
   - 도메인 타입은 `types.ts`, 컴포넌트 Props는 파일 상단 로컬 선언.
   - 상태 변경은 `App.tsx`에 인라인, 불변(`filter`/`map`).

4. **검증 훅 반영**: 파일을 편집하면 `settings.json`의 PostToolUse 훅이 자동으로 `npm run format`(Prettier 자동 정리), `npm run lint`, `npm run typecheck`를 돌린다. lint/타입 위반이 있으면 그 내용이 피드백으로 돌아온다. 피드백이 오면 규칙을 깨지 않는 방향으로 모두 고치고, 깨끗해질 때까지 다음으로 넘어가지 않는다.

5. **규칙 준수 자기 점검**: 구현이 끝나면 변경분을 아래 체크리스트로 직접 대조한다.
   - 클릭 버튼이 `Button.tsx`인가? 삭제가 `variant="danger" size="small" icon="delete"`인가?
   - 완료가 텍스트 클릭 + `todo-item--done` 취소선인가?
   - `Todo.completed: boolean`이 `types.ts`에 있고, 새 할 일이 `completed: false`인가?
   - 콜백이 정확히 `onDelete(id)`, `onToggle(id)`인가?
   - 상태가 `App.tsx` 인라인 + 불변 갱신인가?
   - 컴포넌트가 default export, Props가 파일 상단 로컬 선언인가?
   - 위반이 있으면 고친 뒤 다시 점검한다.

6. **보고**: 무엇을 어떤 규칙에 따라 바꿨는지 간결히 보고한다. 커밋은 사용자가 명시적으로 요청할 때만 한다.

## 하지 말 것

- 규칙과 다른 "더 나은" 방식으로 임의 변경하지 않는다. 개선 아이디어는 구현 후 제안만 한다.
- 커스텀 훅/전역 스토어/라우터 도입 등 단일 컴포넌트 모델을 벗어나지 않는다.
- 요청하지 않은 기능을 덧붙이지 않는다.
