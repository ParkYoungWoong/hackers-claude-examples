import { readFileSync } from 'node:fs'
import https from 'node:https'

// 훅 입력(JSON)을 읽기
let input = ''
try { input = readFileSync(0, 'utf8') } 
catch {}

let data = {}
try { data = JSON.parse(input) } 
catch {}

const msg = (data.last_assistant_message || '(응답 텍스트 없음)').slice(0, 3000)
const payload = JSON.stringify({
  text: `✅ Claude Code 작업 완료\n\n${msg}`
})

// https 모듈로 전송
const req = https.request(
  'https://hooks.slack.com/services/<YOUR_WEBHOOK>',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    },
    agent: false
  },
  (res) => {
    res.resume() // 응답 본문을 소비해 소켓이 닫히도록
  }
)

req.on('error', () => {}) // 알림 실패가 작업을 막지 않도록 무시
req.end(payload)