# Windows Setup Guide for Perplexity MCP Server

This guide explains how to use the provided batch file to run the Perplexity MCP Server on Windows systems.

## Using the Batch File

The repository includes a batch file `run-perplexity-server.bat` that helps you run the server with the proper environment variable configuration.

### Why Use the Batch File?

On Windows, there can sometimes be issues with Node.js applications properly reading environment variables from `.env` files. The batch file solves this by:

1. Explicitly setting the required environment variable before running the application
2. Using the correct path to the application regardless of where you are in your file system when running the batch file

### Running the Server

1. Make sure you've built the project first:
   ```
   npm run build
   ```

2. Double-click the `run-perplexity-server.bat` file in Windows Explorer

   OR

   Run it from Command Prompt or PowerShell:
   ```
   .\run-perplexity-server.bat
   ```

### Customizing the Batch File

If you need to change your API key, edit the batch file and update the following line:

```bat
set PERPLEXITY_API_KEY=your_api_key_here
```

## Integrating with Cursor MCP

### Option 1: Use the Node.js Entry Script (Recommended)

The repository includes a special Node.js entry script designed specifically for Cursor MCP integration.

1. In Cursor, go to the MCP configuration
2. Set the command to:
   ```
   node C:/Users/Owner/Documents/Github_Repositories/perplexity-mcp-server/cursor-entry.js
   ```

This script directly sets the environment variable in the Node.js process before loading the application.

### Option 2: Use the CMD Script

Alternatively, you can use the provided CMD script:

1. In Cursor, go to the MCP configuration
2. Set the command to:
   ```
   C:/Users/Owner/Documents/Github_Repositories/perplexity-mcp-server/run-perplexity-server.cmd
   ```

### Option 3: Use the Hidden Window VBS Script (No Console Window)

If you want to run the server without seeing a console window, use the VBS script:

1. In Cursor, go to the MCP configuration
2. Set the command to:
   ```
   C:/Users/Owner/Documents/Github_Repositories/perplexity-mcp-server/run-perplexity-server-hidden.vbs
   ```

This script runs the server completely in the background without showing any console window.

### Option 4: Direct Node Command

If the above options don't work, you can try a direct command:

1. In Cursor, go to the MCP configuration
2. Set the command to:
   ```
   cmd.exe /c "set PERPLEXITY_API_KEY=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 && node C:/Users/Owner/Documents/Github_Repositories/perplexity-mcp-server/dist/index.js"
   ```

## Troubleshooting

### Script Not Running

If the batch file doesn't run when double-clicked, try:
- Right-click and select "Run as administrator"
- Open a Command Prompt and navigate to the project directory, then run the batch file

### "Node" Not Recognized

If you see an error about "node" not being recognized:
1. Make sure Node.js is installed
2. Ensure the Node.js installation directory is in your system PATH
3. Try using the full path to node in the batch file:
   ```bat
   "C:\Program Files\nodejs\node.exe" %~dp0dist/index.js
   ```

### Other Issues

If you encounter other issues:
1. Check that the project is built properly (`npm run build`)
2. Verify your API key is correct
3. Make sure the `dist` directory contains the compiled JavaScript files