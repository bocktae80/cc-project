import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// MCP 서버 생성
const server = new McpServer({
  name: "my-time-server",
  version: "1.0.0",
});

// 현재 시간 알려주는 도구
server.tool("get_current_time", "현재 시간을 알려줍니다", {}, async () => {
  const now = new Date();
  const timeString = now.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return {
    content: [
      {
        type: "text",
        text: `현재 시간: ${timeString}`,
      },
    ],
  };
});

// 서버 시작
const transport = new StdioServerTransport();
await server.connect(transport);
