# 왜 하네스가 일관성과 안정성을 만드는가

하네스 엔지니어링은 한 가지 도구가 아니라 **여러 계층의 조합**이다. 이 프로젝트의 `harness` 브랜치는 아래 계층으로 구성했고, 각 계층이 서로 다른 방식으로 결과를 수렴시킨다.

## 계층 1: 규칙 = "결정을 미리 내려 고정"

세션 시작 시 자동으로 로드되는 규칙들이 "정답이 없어서 매번 갈리는" 결정을 하나로 못 박는다.

- `CLAUDE.md`의 **기능 개발 규칙**: todo 기능 구현에서 갈리는 결정([decision-points.md](./decision-points.md)) - 버튼 컴포넌트 사용, `completed` 필드, `onDelete`/`onToggle` 네이밍, 취소선 등.
- `.claude/rules/`의 **일반 규칙**: `code-style.md`(Prettier가 못 잡는 네이밍/import/구조), `security.md`(위험 API/비밀키), `testing.md`(테스트 작성 기준). `paths` frontmatter로 `code-style`/`security`는 `src` 코드를 만질 때만 로드되어 컨텍스트를 아낀다.

**기여**: 일관성의 1차 원천. before/after 차이의 대부분이 여기서 나온다.

## 계층 2: 검증 훅 = "자동 정리 + 품질 피드백"

`.claude/settings.json`의 `PostToolUse` 훅에 명령을 직접(inline) 적어, 파일을 `Edit`/`Write` 할 때마다 실행한다.

```json
"hooks": [
  { "command": "npm run format" },
  { "command": "npm run lint || exit 2" },
  { "command": "npm run typecheck || exit 2" }
]
```

- **`npm run format`**(`prettier --write .`): 편집 결과를 `.prettierrc`대로 **자동 정리**한다.
- **`npm run lint`/`typecheck`**: ESLint(Prettier 통합)와 타입 체크. 위반 시 `|| exit 2`로 종료 코드 2를 낸다.

**왜 `|| exit 2`인가**: PostToolUse 훅은 편집이 _이미 끝난 뒤_ 돌기 때문에 편집을 되돌려 "차단"하지 못한다. 종료 코드 2일 때만 오류가 클로드에게 **피드백**으로 전달되어 다음 단계에서 스스로 고치게 한다. 일반 실패(코드 1)는 피드백이 가지 않아 `|| exit 2`로 승격시킨다.

**기여**: 안정성. 매 편집이 "자동 포맷 + 타입/린트 피드백"을 거친다. 셸 스크립트 없이 `settings.json`만 읽으면 무엇이 도는지 보인다.

## 계층 3: 차단 훅(hookify) = "금지 규칙을 실제로 차단"

`.claude/hookify.block-dangerous-api.local.md`는 hookify 플러그인의 **PreToolUse** 훅으로 동작한다. `src` 코드에 `dangerouslySetInnerHTML`/`eval(`/`new Function(`이 들어가면 편집을 **실제로 막는다**(`permissionDecision: deny`).

- 계층 2(피드백)와의 차이: PreToolUse는 편집 _전에_ 돌아 차단이 가능하다. `security.md` 규칙 중 "절대 금지"를 시스템으로 강제하는 계층.
- **기여**: 안정성/보안. 규칙을 어기는 편집 자체가 일어나지 않는다.

## 계층 4: 스킬 = "워크플로우 재현"

- `implement-feature`: 기능 구현 절차(규칙 로드 → 구현 → 검증 훅 반영 → 자기 점검 → 보고)를 캡슐화.
- `tested-component`: 새 컴포넌트 생성 시 테스트 필요성을 판단하고 필요하면 `*.test.tsx`를 동반 작성.

**기여**: 일관성을 절차 수준에서 보강하고, 테스트 누락을 생성 시점에 막는다. 테스트 러너는 vitest이며 `npm run test`로 실행한다.

## 계층이 합쳐지면

| 계층             | 막는 분산                    | 만드는 가치     |
| ---------------- | ---------------------------- | --------------- |
| 규칙(자동 로드)  | 설계/스타일 결정이 매번 다름 | 일관성          |
| 검증 훅          | 포맷/타입/린트가 안 맞음     | 안정성          |
| 차단 훅(hookify) | 금지 패턴이 코드에 들어감    | 안정성/보안     |
| 스킬             | 절차/테스트가 사람마다 다름  | 일관성 + 재현성 |

before에는 이 계층들이 모두 없다. 결과는 "그때 클로드가 어떻게 판단했는지"에 달려 매번 달라진다. after에는 함께 작동해서 **입력(프롬프트)이 같으면 출력(코드 구조, 스타일, 품질)이 같아진다.** 이것이 하네스 엔지니어링이 일관성과 안정성을 확보한다는 말의 구체적 의미다.

## 한 단계 더

이 데모는 의도적으로 작게 만들었다. 실무에서는 다음을 더 얹을 수 있다.

- 더 많은 도메인 규칙(폴더 구조, 에러 처리 패턴)
- 커버리지 임계치 등 더 강한 테스트 게이트
- 커밋/PR 단계의 게이트(`smart-commit-push` 스킬과 연계)
- 더 많은 hookify 차단 규칙(아키텍처 위반, 비밀키 등)
