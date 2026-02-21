#!/bin/bash
# important.txt 파일 수정을 차단하는 가드 훅

if echo "$CLAUDE_TOOL_INPUT" | grep -q "important.txt"; then
  echo "🚫 important.txt는 수정할 수 없습니다!"
  exit 2
fi

exit 0
