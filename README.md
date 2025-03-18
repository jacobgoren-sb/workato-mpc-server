🤖 Workato MCP Server
Welcome to your Workato API integration toolkit, designed as a Model Context Protocol (MCP) server for Cursor! This project provides seamless interaction with Workato's API through custom AI tools.

✨ Features
🔄 Recipe Management
- List, create, start, and stop recipes
- Monitor recipe execution jobs
- Manage recipe folders and projects

🔌 Connection Management
- List and create connections
- View connection details and status
- Manage connection configurations

🔍 Connector Discovery
- List available connectors and their capabilities
- View connector metadata and supported operations
- Browse all platform connectors

📂 Folder & Project Organization
- Create and manage folders
- Organize recipes and connections
- Handle project-level configurations

🚀 Getting Started
1. Environment Setup
First, you'll need to set up your environment variables:

```bash
export WORKATO_API_TOKEN="your_token_here"
```

⚠️ Security Note: Never store API tokens directly in source code. Use environment variables or secure secret management solutions.

2. Installation
```bash
npm install
# or
yarn install
```

3. Build the Server
```bash
npm run build
```

4. Adding to Cursor
This project is designed to be used as an MCP server in Cursor. Here's how to set it up:

1. Open Cursor
2. Go to Cursor Settings > Features > MCP
3. Click + Add New MCP Server
4. Fill out the form:
   - Name: Workato MCP Server
   - Type: stdio
   - Command: node /path/to/your/project/dist/server.js
   - Environment Variables:
     - Click "Add Environment Variable"
     - Name: WORKATO_API_TOKEN
     - Value: your_token_here

📘 Pro Tip: Use the full path to your project's built server.js file.

Alternative Configuration:
You can also configure the MCP server using a `.cursor/mcp.json` file in your project:

```json
{
  "mcpServers": {
    "workato-tools": {
      "command": "node",
      "args": ["/path/to/your/project/dist/server.js"],
      "env": {
        "WORKATO_API_TOKEN": "your_token_here"
      }
    }
  }
}
```

Using with Claude Desktop:
If you're using Claude Desktop instead of Cursor, you can configure the MCP server by editing the Claude desktop configuration:

1. Open or create the configuration file:
   ```bash
   # On macOS
   ~/Library/Application Support/Claude/claude_desktop_config.json
   # On Windows
   %APPDATA%\Claude\claude_desktop_config.json
   # On Linux
   ~/.config/Claude/claude_desktop_config.json
   ```

2. Add your MCP server configuration:
   ```json
   {
     "mcp_servers": {
       "workato-tools": {
         "command": "node",
         "args": ["/path/to/your/project/dist/server.js"],
         "env": {
           "WORKATO_API_TOKEN": "your_token_here"
         }
       }
     }
   }
   ```

3. Save the file and restart Claude Desktop for the changes to take effect

This method allows you to:
- Version control your MCP configuration
- Include environment variables directly in the config
- Share the same configuration across team members (excluding sensitive values)
- Automatically load the server when opening the project in Cursor

⚠️ Security Note: If including the config file in version control, make sure to:
1. Never commit actual API tokens
2. Use placeholder values or environment variable references
3. Add sensitive values to your .gitignore file

🛠️ Available Tools

Recipe Management:
- list-recipes: List all recipes with filtering options
- create-recipe: Create a new recipe
- start-recipe: Start a specific recipe
- stop-recipe: Stop a running recipe

Connection Management:
- list-connections: List all connections
- create-connection: Create a new connection

Connector Tools:
- list-connectors: Get metadata for specific connectors
- list-all-connectors: List all available connectors

Organization Tools:
- list-folders: List all folders
- create-folder: Create a new folder
- update-folder: Modify folder properties
- list-projects: List all projects
- update-project: Update project details

Job Management:
- list-recipe-jobs: View jobs for a specific recipe
- get-job: Get detailed job information
- resume-job: Resume a paused job

📁 Project Structure
```
src/
├── server.ts    # Main MCP server implementation
└── README.md    # This documentation
```

Example Usage:
```typescript
// List all recipes in a folder
{
  "folder_id": "12345",
  "per_page": 50
}

// Create a new connection
{
  "name": "My Salesforce Connection",
  "provider": "salesforce",
  "folder_id": "12345",
  "input": {
    "environment": "production",
    "auth_type": "oauth2"
  }
}

// Start a recipe
{
  "id": 67890
}
```

🤝 Contributing
Contributions welcome! Please feel free to submit a Pull Request.

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🐛 Issues & Support
Found a bug or need help? Open an issue with:
- What you were trying to do
- What happened instead
- Steps to reproduce
- Your environment details

Made with ❤️ by Jacob Goren, for Workato automation 