# Perplexity MCP Server

[![smithery badge](https://smithery.ai/badge/@spragginsdesigns/perplexity-mcp-server)](https://smithery.ai/server/@spragginsdesigns/perplexity-mcp-server)

This is a simple MCP server that allows you to search the web using Perplexity AI.

## Installation

### Installing via Smithery

To install Perplexity MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@spragginsdesigns/perplexity-mcp-server):

```bash
npx -y @smithery/cli install @spragginsdesigns/perplexity-mcp-server --client claude
```

### Prerequisites
- Node.js 18+ (Download from [nodejs.org](https://nodejs.org/))
- Git (Download from [git-scm.com](https://git-scm.com/download/win))
- A Perplexity AI API key

### Steps for Windows

1. Clone the repository:
```bash
git clone [repository-url]
cd perplexity-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
   - Create a new file named `.env` in the root directory
   - Add your Perplexity AI API key:
   ```env
   PERPLEXITY_API_KEY=your_api_key_here
   ```

## Usage on Windows

### Development Mode
```bash
npm run dev
```

### Production Mode
1. Build the project:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

### Using the Windows Batch File (Recommended)
To avoid environment variable issues on Windows, use the included batch file:

1. Build the project first:
```bash
npm run build
```

2. Run the batch file:
```bash
.\run-perplexity-server.bat
```

Alternatively, double-click the `run-perplexity-server.bat` file in Windows Explorer.

For detailed instructions, see the [Windows Setup Guide](./docs/windows-setup.md).

## Troubleshooting Windows Issues

### Common Issues

1. **Permission Errors**
   - Run Command Prompt or PowerShell as Administrator
   - Check file permissions in the project directory

2. **Environment Variables**
   - Ensure `.env` file is in the root directory
   - No spaces around the `=` sign in `.env` file
   - Restart terminal after making changes to environment variables
   - Use the provided batch file to avoid environment variable issues

3. **Node.js Issues**
   - Verify Node.js installation: `node --version`
   - Ensure npm is installed: `npm --version`

### Error Messages

If you see `Error: ENOENT: no such file or directory`, ensure:
- All paths use correct Windows-style separators
- You're in the correct directory
- Required files exist

## Project Structure
```
perplexity-mcp-server/
├── src/
│   └── index.ts          # Main server implementation
├── dist/                 # Compiled output
├── .env                  # Environment variables
├── package.json          # Project configuration
├── run-perplexity-server.bat # Windows batch file
└── tsconfig.json         # TypeScript configuration
```

## API Usage

The server provides a single tool `perplexity_search` for web searches:

```json
{
  "name": "perplexity_search",
  "arguments": {
    "query": "your search query here"
  }
}
```

## License

MIT
