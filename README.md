🤖 Workato MCP Server
Welcome to your Workato API integration toolkit, designed as a Model Context Protocol (MCP) server for Cursor or Claude! This project provides seamless interaction with Workato's API through custom AI tools.

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

🔖 Tag Management
- Create, update, and delete tags in your workspace
- List and retrieve available tags with advanced filtering options
- Apply or remove tags from assets (recipes and connections)
- Supports batch operations for multiple assets and tags
- Filter tags by title, description, author, and usage
- Sort tags by various criteria (title, usage count, etc.)
- Customize tag appearance with color options

Example tag operations:
```json
// Create a new tag
{
  "title": "HR",
  "description": "HR department tag",
  "color": "green"
}

// List tags with filters
{
  "includes[]": ["author", "assignment_count"],
  "q[title_or_description_cont]": "hr",
  "sort_by[]": ["assignment_count"],
  "sort_direction[]": ["desc"]
}

// Manage tag assignments
{
  "add_tags": ["tag-ANgdXgTF-bANz3H"],
  "recipe_ids": [54525313],
  "connection_ids": [1571346]
}
```

Note: Use the list-tags tool first to retrieve valid tag handles before managing tag assignments.

🚀 Getting Started
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

API Management:
- list-api-endpoints: List all API endpoints with optional filtering by collection

Tag Management:
- list-tags: List and filter available tags in your workspace with advanced query options
- create-tag: Create a new tag with custom title, description, and color
- update-tag: Modify an existing tag's properties
- delete-tag: Remove a tag from your workspace
- manage-tags: Apply or remove tags from recipes and connections

Job Management:
- list-recipe-jobs: View jobs for a specific recipe
- get-job: Get detailed job information
- resume-job: Resume a paused job

🤝 Contributing Contributions welcome! Please feel free to submit a Pull Request.

📝 License This project is licensed under the MIT License - see the LICENSE file for details.

🐛 Issues & Support Found a bug or need help? Open an issue with:

What you were trying to do
What happened instead
Steps to reproduce
Your environment details

Made with ❤️ by Jacob Goren, for Workato automation