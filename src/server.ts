import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "workato-mcp-server",
  version: "1.0.0"
});

// Add list-recipes tool
server.tool(
  "list-recipes",
  {
    adapter_names_all: z.string().optional(),
    adapter_names_any: z.string().optional(),
    folder_id: z.string().optional(),
    order: z.enum(["activity", "default"]).optional(),
    page: z.number().int().min(1).optional().default(1),
    per_page: z.number().int().min(1).max(100).optional().default(100),
    running: z.boolean().optional(),
    since_id: z.number().int().optional(),
    stopped_after: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/).optional(),
    stop_cause: z.enum(["trigger_errors_limit", "action_quota_limit", "trial_expired", "txn_quota_limit"]).optional(),
    updated_after: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/).optional(),
    includes: z.array(z.string()).optional()
  },
  async (params) => {
    // Construct query parameters
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(`${key}[]`, v));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });

    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/recipes?${queryParams.toString()}`, {
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN
      }
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add create-recipe tool
server.tool(
  "create-recipe",
  {
    recipe: z.object({
      name: z.string().optional(),
      code: z.string(),
      config: z.string().optional(),
      folder_id: z.string().optional(),
      description: z.string().optional()
    })
  },
  async (params) => {
    // Make API call to Workato
    const response = await fetch('https://www.workato.com/api/recipes', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add start-recipe tool
server.tool(
  "start-recipe",
  {
    id: z.number().int()
  },
  async (params) => {
    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/recipes/${params.id}/start`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN
      }
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add stop-recipe tool
server.tool(
  "stop-recipe",
  {
    id: z.number().int()
  },
  async (params) => {
    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/recipes/${params.id}/stop`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN
      }
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add list-connections tool
server.tool(
  "list-connections",
  {
    folder_id: z.string().optional(),
    parent_id: z.string().optional(),
    external_id: z.string().optional(),
    include_runtime_connections: z.string().optional(),
    includes: z.array(z.string()).optional()
  },
  async (params) => {
    // Construct query parameters
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(`${key}[]`, v));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });

    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/connections?${queryParams.toString()}`, {
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN
      }
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add create-connection tool
server.tool(
  "create-connection",
  {
    name: z.string().optional(),
    provider: z.string().optional(),
    parent_id: z.string().optional(),
    folder_id: z.string().optional(),
    external_id: z.string().optional(),
    shell_connection: z.boolean().optional(),
    input: z.record(z.any()).optional()
  },
  async (params) => {
    // Make API call to Workato
    const response = await fetch('https://www.workato.com/api/connections', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add list-connectors tool
server.tool(
  "list-connectors",
  {
    applications: z.string()
  },
  async (params) => {
    // Construct query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('applications', params.applications);

    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/integrations?${queryParams.toString()}`, {
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN
      }
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add list-all-connectors tool
server.tool(
  "list-all-connectors",
  {
    page: z.number().int().min(1).optional().default(1),
    per_page: z.number().int().min(1).max(100).optional().default(100)
  },
  async (params) => {
    // Construct query parameters
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });

    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/integrations/all?${queryParams.toString()}`, {
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN
      }
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add list-folders tool
server.tool(
  "list-folders",
  {
    parent_id: z.string().optional(),
    page: z.number().int().min(1).optional().default(1),
    per_page: z.number().int().min(1).max(100).optional().default(100)
  },
  async (params) => {
    // Construct query parameters
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });

    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/folders?${queryParams.toString()}`, {
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN
      }
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add list-projects tool
server.tool(
  "list-projects",
  {
    page: z.number().int().min(1).optional().default(1),
    per_page: z.number().int().min(1).max(100).optional().default(100)
  },
  async (params) => {
    // Construct query parameters
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });

    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/projects?${queryParams.toString()}`, {
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN
      }
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add create-folder tool
server.tool(
  "create-folder",
  {
    name: z.string(),
    parent_id: z.string().optional()
  },
  async (params) => {
    // Make API call to Workato
    const response = await fetch('https://www.workato.com/api/folders', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add update-folder tool
server.tool(
  "update-folder",
  {
    folder_id: z.string(),
    name: z.string().optional(),
    parent_id: z.string().optional()
  },
  async (params) => {
    const { folder_id, ...updateParams } = params;
    
    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/folders/${folder_id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateParams)
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add update-project tool
server.tool(
  "update-project",
  {
    project_id: z.string(),
    name: z.string(),
    description: z.string().optional()
  },
  async (params) => {
    const { project_id, ...updateParams } = params;
    
    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/projects/${project_id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateParams)
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add list-recipe-jobs tool
server.tool(
  "list-recipe-jobs",
  {
    recipe_id: z.number().int(),
    offset_job_id: z.string().optional(),
    prev: z.boolean().optional().default(false),
    status: z.enum(["succeeded", "failed", "pending"]).optional(),
    rerun_only: z.boolean().optional()
  },
  async (params) => {
    // Construct query parameters
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && key !== 'recipe_id') {
        queryParams.append(key, String(value));
      }
    });

    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/recipes/${params.recipe_id}/jobs?${queryParams.toString()}`, {
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN
      }
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add get-job tool
server.tool(
  "get-job",
  {
    recipe_id: z.number().int(),
    job_handle: z.string()
  },
  async (params) => {
    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/recipes/${params.recipe_id}/jobs/${params.job_handle}`, {
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN
      }
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add resume-job tool
server.tool(
  "resume-job",
  {
    token: z.string(),
    data: z.record(z.any()).optional()
  },
  async (params) => {
    // Make API call to Workato
    const response = await fetch('https://www.workato.com/api/job/resume', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    // Since this endpoint returns 204 with no content, we'll return a success message
    return {
      content: [{ type: "text", text: "Job resumed successfully" }]
    };
  }
);

// Add list-api-endpoints tool
server.tool(
  "list-api-endpoints",
  {
    api_collection_id: z.string().optional(),
    per_page: z.number().int().min(1).max(100).optional().default(100),
    page: z.number().int().min(1).optional().default(1)
  },
  async (params) => {
    // Construct query parameters
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });

    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/api_endpoints?${queryParams.toString()}`, {
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN
      }
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add manage-tags tool
server.tool(
  "manage-tags",
  {
    add_tags: z.array(z.string()).optional(),
    remove_tags: z.array(z.string()).optional(),
    recipe_ids: z.array(z.number()).optional(),
    connection_ids: z.array(z.number()).optional()
  },
  async (params) => {
    // Make API call to Workato
    const response = await fetch('https://www.workato.com/api/tags_assignments', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Update list-tags tool with full parameters
server.tool(
  "list-tags",
  {
    page: z.number().int().min(1).optional().default(1),
    per_page: z.number().int().min(1).max(100).optional().default(100),
    'q[title_or_description_cont]': z.string().optional(),
    'q[handle_in]': z.array(z.string()).optional(),
    'q[author_id_eq]': z.number().optional(),
    'q[recipe_id_eq]': z.number().optional(),
    'q[connection_id_eq]': z.number().optional(),
    'q[only_assigned]': z.boolean().optional(),
    'sort_by[]': z.array(z.enum(['title', 'assignment_count', 'updated_at', 'last_assigned_at'])).optional(),
    'sort_direction[]': z.array(z.enum(['asc', 'desc'])).optional(),
    'includes[]': z.array(z.enum(['assignment_count', 'author'])).optional()
  },
  async (params) => {
    // Construct query parameters
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, String(v)));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });

    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/tags?${queryParams.toString()}`, {
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN
      }
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add create-tag tool
server.tool(
  "create-tag",
  {
    title: z.string().max(30),
    description: z.string().max(150).optional(),
    color: z.enum(['blue', 'violet', 'green', 'red', 'orange', 'gold', 'indigo', 'brown', 'teal', 'plum', 'slate', 'neutral']).optional()
  },
  async (params) => {
    // Make API call to Workato
    const response = await fetch('https://www.workato.com/api/tags', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add update-tag tool
server.tool(
  "update-tag",
  {
    handle: z.string(),
    title: z.string().max(30),
    description: z.string().max(150).optional(),
    color: z.enum(['blue', 'violet', 'green', 'red', 'orange', 'gold', 'indigo', 'brown', 'teal', 'plum', 'slate', 'neutral']).optional()
  },
  async (params) => {
    const { handle, ...updateParams } = params;
    
    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/tags/${handle}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateParams)
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Add delete-tag tool
server.tool(
  "delete-tag",
  {
    handle: z.string()
  },
  async (params) => {
    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/tags/${params.handle}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN
      }
    });

    return {
      content: [{ type: "text", text: "Tag deleted successfully" }]
    };
  }
);

// Add list-activity-logs tool
server.tool(
  "list-activity-logs",
  {
    'page[after]': z.number().int().optional(),
    'page[size]': z.number().int().min(1).max(100).optional().default(100),
    from: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/).optional(),
    to: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/).optional(),
    'users_ids[]': z.array(z.number()).optional(),
    'include_resource_types[]': z.array(z.string()).optional(),
    'exclude_resource_types[]': z.array(z.string()).optional(),
    'include_event_types[]': z.array(z.string()).optional(),
    'exclude_event_types[]': z.array(z.string()).optional()
  },
  async (params) => {
    // Construct query parameters
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, String(v)));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });

    // Make API call to Workato
    const response = await fetch(`https://www.workato.com/api/activity_logs?${queryParams.toString()}`, {
      headers: {
        'Authorization': 'Bearer ' + process.env.WORKATO_API_TOKEN
      }
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport); 