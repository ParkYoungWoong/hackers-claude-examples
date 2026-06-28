---
name: block-dangerous-api
enabled: true
event: file
action: block
conditions:
  - field: file_path
    operator: regex_match
    pattern: src/.*\.(ts|tsx)$
  - field: content
    operator: regex_match
    pattern: dangerouslySetInnerHTML|\beval\s*\(|\bnew\s+Function\s*\(
---

🚫 **위험 API 차단 (security.md 규칙)**

`src` 코드에 다음 중 하나가 감지되어 편집을 막았습니다.

- `dangerouslySetInnerHTML` - XSS 위험. 텍스트는 JSX 기본 렌더링(자동 이스케이프)으로 표시하세요.
- `eval(` / `new Function(` - 문자열을 코드로 실행하는 위험 패턴. 사용하지 마세요.

`.claude/rules/security.md`의 규칙을 그대로 따르세요. 정말 필요한 예외라면 사용자에게 먼저 확인하세요.
