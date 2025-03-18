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
- Manage tag assignments
- Applies or removes tags from assets in your workspace. Assets that can be tagged through this endpoint include recipes and connections. You can assign one or more tags to these assets or remove existing tags.

POST /api/tags_assignments

#Payload
Name	Type	Description
add_tags	array of strings	optional	An array of tag handles to be added. Each handle represents a tag to be applied to the specified assets.
remove_tags	array of strings	optional	An array of tag handles to be removed. Each handle represents a tag to be removed from the specified assets.
recipe_ids	array of integers	conditional	An array of recipe IDs to tag or untag. Required if connection_ids is not provided.
connection_ids	array of integers	conditional	An array of connection IDs to tag or untag. Required if recipe_ids is not provided.

RETRIEVE TAG HANDLES WITH THE LIST TAGS ENDPOINT

Use the List tags (GET /api/tags) endpoint to retrieve the handles of the tags you plan to apply or remove.

#Sample request
This request adds the Accounting tag with the handle tag-ANgdXgTF-bANz3H to both a connection and a recipe in Workato.

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
🤝 Contributing Contributions welcome! Please feel free to submit a Pull Request.

📝 License This project is licensed under the MIT License - see the LICENSE file for details.

🐛 Issues & Support Found a bug or need help? Open an issue with:

What you were trying to do
What happened instead
Steps to reproduce
Your environment details

📚 API Management

List API Collections
- List all API collections. The endpoint returns the project_id of the project to which the collections belong in the response.

GET /api/api_collections

#Query parameters
Name	Type	Description
per_page	integer	Number of API collections to return in a single page. Defaults to 100. Max is 100.
page	integer	Page number of the API collections to fetch. Defaults to 1.

#Response
[
    {
        "id": 1361,
        "name": "Quote to cash",
        "version": "1.0",
        "url": "https://api.peatql.io/quote-to-cash-v1",
        "api_spec_url": "https://www.workato.com/doc/service/quote-to-cash-v1/swagger?token=4cab5bdf2cebbe2b4ahjkc9ac175f60c",
        "created_at": "2020-06-15T22:20:15.327-07:00",
        "updated_at": "2020-06-15T22:20:15.327-07:00",
        "project_id": "523144"
    }
]

List API Endpoints
- Lists all API endpoints. Specify the api_collection_id to obtain the list of endpoints in a specific collection.

GET /api/api_endpoints

#Query parameters
Name	Type	Description
api_collection_id	string	ID of the API collection. If the parameter is not provided, all API endpoints are returned.
per_page	integer	Number of API endpoints to return in a single page. Defaults to 100. Max is 100.
page	integer	Page number of the API endpoints to fetch. Defaults to 1.

#Sample request
```bash
curl  -X GET 'https://www.workato.com/api/api_endpoints?api_collection_id=1391' \
      -H 'Authorization: Bearer <api_token>' \
      -H 'Content-Type: application/json' \
```

#Response
[
  {
      "id": 9903,
      "api_collection_id": 1391,
      "flow_id": 39999,
      "name": "salesforce search",
      "method": "GET",
      "url": "https://api.na.workato.com/abstergoi/netsuite-customers-v1/salesforce/search",
      "legacy_url": null,
      "base_path": "/abstergoi/netsuite-customers-v1/salesforce/search",
      "path": "salesforce/search",
      "active": false,
      "legacy": false,
      "created_at": "2020-08-05T05:59:55.991-07:00",
      "updated_at": "2020-08-05T05:59:55.991-07:00"
  }
]

Made with ❤️ by Jacob Goren, for Workato automation