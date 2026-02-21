#!/bin/bash
# 모든 도구 사용을 자동으로 기록하는 로그 훅

LOG_FILE="tool-log.txt"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] Tool: $CLAUDE_TOOL_NAME" >> "$LOG_FILE"
echo "  Input: $CLAUDE_TOOL_INPUT" >> "$LOG_FILE"
echo "---" >> "$LOG_FILE"
