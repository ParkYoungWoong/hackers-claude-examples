# MCP (Model Context Protocol) 정리
작성: 2024-12-01

## MCP란?
Anthropic이 발표한 AI 도구 통합 표준 프로토콜.
LLM이 외부 시스템에 접근하는 방식을 표준화함.

## 구성요소
- **MCP Server**: 도구/리소스를 제공하는 쪽 (예: Notion, GitHub, DB)
- **MCP Client**: 도구를 사용하는 AI (예: Claude)
- **Transport**: stdio, HTTP+SSE 방식 지원

## 지원하는 기능 유형
1. Tools - 함수 실행 (검색, 파일 읽기, API 호출 등)
2. Resources - 데이터 조회 (문서, DB 레코드 등)
3. Prompts - 미리 정의된 프롬프트 템플릿

## 장점
- 한 번 만든 MCP 서버를 여러 AI에서 재사용 가능
- Claude Desktop, Claude Code, Cursor 등에서 동일하게 사용
- 커뮤니티 서버 이미 엄청나게 많음

## 내가 써본 MCP 서버들
- filesystem: 로컬 파일 읽기/쓰기
- github: 이슈/PR 관리
- notion: 페이지 읽기/생성
- playwright: 브라우저 자동화
- context7: 공식 문서 검색

## 직접 만들어볼 아이디어
- 사내 Confluence MCP 서버
- 개인 캘린더 조회 서버
