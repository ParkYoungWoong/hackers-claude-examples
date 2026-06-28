---
name: smart-commit-push
description: 프로젝트의 변경 사항을 확인하고 한글 메시지로 커밋하며 원격 저장소에 푸시합니다.
when_to_use: 버전 관리 중 커밋(Commit), 푸시(Push) 기능을 요청할 때 사용합니다.
allowed-tools: Read Grep Glob Bash(git:*) WebFetch(domain:github.com)
model: haiku
metadata:
  - author: ParkYoungWoong
  - version: 1.0.0
---

# Smart Commit & Push

현재 변경 사항을 한글 커밋 메시지로 커밋하고 원격에 푸시합니다.

## 절차

1. 변경 사항을 분석하고 변경이 없으면 종료
1. `git add`, `git commit` 명령으로 커밋 진행
1. 아래 '메시지 규칙'에 따라 커밋 메시지를 한글로 작성
1. 사용자 지시의 푸시 여부에 따라 `git push` 명령으로 푸시 진행
1. 모든 작업이 종료되면 처리 결과를 사용자에게 출력

## 메시지 규칙

- 타입: `feat`, `fix`, `doc`, `test`
- 메시지: 50자 이내로 명료하게, 명령형으로 작성

```text
<타입>: <메시지>
```

```text
feat: Smart Commit & Push 스킬 생성
```
