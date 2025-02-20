import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
	CallToolRequestSchema,
	ListToolsRequestSchema,
	ErrorCode,
	McpError
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
	{
		name: "perplexity-search",
		version: "1.0.0"
	},
	{
		capabilities: {
			tools: {
				perplexity_search: {
					name: "perplexity_search",
					description: "Search the web using Perplexity AI",
					inputSchema: {
						type: "object",
						properties: {
							query: {
								type: "string",
								description: "The search query"
							}
						},
						required: ["query"]
					}
				}
			}
		}
	}
);

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
	return {
		tools: [
			{
				name: "perplexity_search",
				description: "Search the web using Perplexity AI",
				inputSchema: {
					type: "object",
					properties: {
						query: {
							type: "string",
							description: "The search query"
						}
					},
					required: ["query"]
				}
			}
		]
	};
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
	if (request.params.name === "perplexity_search") {
		const apiKey = process.env.PERPLEXITY_API_KEY;
		if (!apiKey) {
			throw new McpError(
				ErrorCode.InvalidRequest,
				"PERPLEXITY_API_KEY environment variable is not set"
			);
		}

		const args = request.params.arguments;
		if (!args || typeof args.query !== "string") {
			throw new McpError(
				ErrorCode.InvalidParams,
				"Query parameter is required and must be a string"
			);
		}

		try {
			const response = await fetch(
				"https://api.perplexity.ai/chat/completions",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${apiKey}`,
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						model: "sonar-pro",
						messages: [
							{
								role: "user",
								content: args.query
							}
						]
					})
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return {
				content: [
					{
						type: "text",
						text: data.choices[0].message.content
					}
				]
			};
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			throw new McpError(
				ErrorCode.InternalError,
				`Search failed: ${errorMessage}`
			);
		}
	}

	throw new McpError(ErrorCode.MethodNotFound, "Tool not found");
});

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Perplexity MCP server running on stdio");
