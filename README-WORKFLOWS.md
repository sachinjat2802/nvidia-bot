# Workflow Automation System - n8n-like

A comprehensive workflow automation system built into Moonu Bot, featuring visual workflow editing, multiple integrations, and Supabase-powered persistence.

## Features

### Visual Workflow Editor
- **Drag-and-drop node-based interface** using React Flow
- **10+ node types**: LLM, HTTP, Code, Database, Email, Storage, Webhook, Transform, Conditional, Delay, File
- **Real-time execution** with live feedback
- **Save & load** workflows from Supabase
- **Properties panel** for configuring each node

### Workflow Engine
- **Dependency-based execution** with topological sorting
- **Parallel execution** with configurable concurrency
- **Retry policies** with exponential backoff
- **Timeout handling** and error recovery
- **Context propagation** between steps
- **Template variables** using `${variable}` syntax

### Integrations

#### 1. LLM (NVIDIA AI)
- Call any NVIDIA model
- System prompts and temperature control
- Context injection from previous steps

#### 2. HTTP Requests
- REST API calls
- Custom headers and body
- Timeout configuration
- Response type selection (JSON/Text/Blob)

#### 3. Database Operations
- PostgreSQL, MySQL, MSSQL, MongoDB, SQLite
- Query, Insert, Update, Delete operations
- Stored connection integrations
- Parameterized queries

#### 4. Email (SMTP)
- Send emails with attachments
- HTML or plain text
- CC/BCC support
- Integration-based credentials

#### 5. Cloud Storage
- AWS S3, Google Cloud Storage, Azure Blob
- Upload, Download, Delete, List operations
- Presigned URL generation (future)

#### 6. File System
- Read, Write, Append, Delete, Exists
- Template-based paths
- UTF-8/Base64 encoding

#### 7. Webhooks
- Incoming webhook triggers
- Secret verification
- Payload forwarding

#### 8. Transform
- Data mapping between context paths
- JavaScript transformations
- Filtering and sorting
- Array manipulation

#### 9. Conditional Branching
- JavaScript condition evaluation
- Dynamic path selection
- Boolean logic support

#### 10. Delay
- Millisecond precision delays
- Useful for rate limiting
- Scheduled pauses

### Triggers

#### Webhook Triggers
- Public endpoints at `/api/webhooks/:triggerId`
- Secret-based authentication
- Payload forwarding to workflows

#### Schedule Triggers
- Cron expression support
- Timezone configuration
- Automatic scheduling via node-cron

#### Event Triggers
- Internal event bus
- Custom event types
- Multi-workflow dispatch

### Supabase Integration

#### Database Schema
- `workflows` - Store workflow definitions
- `triggers` - Configure automation triggers
- `executions` - Track execution history
- `integrations` - Store connection credentials

#### Row Level Security (RLS)
- User isolation
- Policies for all tables
- Secure multi-tenancy

#### Authentication
- NextAuth.js integration
- User-based workflow ownership
- Session management

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a new Supabase project
2. Run the SQL schema from `supabase-schema.sql` in the Supabase SQL editor
3. Enable Row Level Security on all tables
4. Copy your Supabase URL and anon key

### 3. Environment Variables

Create a `.env` file (or update existing) with:

```env
# NVIDIA API (existing)
NVIDIA_API_KEY=your-nvidia-api-key

# Supabase (required for workflows)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional integrations
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=your_db
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
S3_BUCKET=your-bucket
```

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` and navigate to the **Workflows** tab.

## Usage

### Creating a Workflow

1. Click on the **Workflows** tab
2. Use the node palette on the left to add nodes to the canvas
3. Click on nodes to configure their properties
4. Connect nodes by dragging from one node's handle to another
5. Set workflow name and description
6. Click **Save Workflow** to store in Supabase
7. Click **Execute** to run immediately

### Node Configuration

#### LLM Node
- **Model**: Select from NVIDIA models
- **System Prompt**: Set AI behavior
- **User Message**: Template with `${variable}` placeholders

#### HTTP Node
- **URL**: Endpoint to call (templates supported)
- **Method**: GET, POST, PUT, DELETE, PATCH
- **Headers**: Custom headers as JSON
- **Body**: Request body (templates supported)

#### Database Node
- **Connection**: Direct or via Integration
- **Type**: PostgreSQL, MySQL, MongoDB, etc.
- **Operation**: Query, Insert, Update, Delete, Select
- **Query**: SQL query or MongoDB query
- **Data**: Parameters for the query

#### Email Node
- **To**: Recipient(s) - comma separated or array
- **Subject**: Email subject (templates supported)
- **Body**: Email content (templates supported)
- **HTML**: Toggle for HTML emails
- **Attachments**: Array of {filename, content, encoding}

#### Code Node
- **Language**: JavaScript/TypeScript only (currently)
- **Code**: Execute custom logic
- **Timeout**: Max execution time (ms)

#### Conditional Node
- **Condition**: JavaScript expression (e.g., `context.value > 10`)
- **Then Step ID**: Step to execute if true
- **Else Step ID**: Step to execute if false

#### Transform Node
- **Mapping**: Array of {source, target, transform}
- **Filter**: JavaScript condition to filter arrays
- **Sort**: Sort by field with order (asc/desc)

### Using Templates

Use `${variable}` syntax to reference context values:

- `${input}` - Original workflow input
- `${stepResults.stepId.output}` - Output from a specific step
- `${context.customKey}` - Custom context values
- `${_workflowId}` - Internal workflow ID

Example: `https://api.example.com/data/${context.userId}`

### Triggers

#### Create a Webhook Trigger

```bash
curl -X POST http://localhost:3000/api/triggers \
  -H "Content-Type: application/json" \
  -d '{
    "trigger": {
      "workflowId": "your-workflow-id",
      "type": "webhook",
      "isActive": true
    }
  }'
```

Then call the webhook:

```bash
curl -X POST http://localhost:3000/api/webhooks/trigger-id \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```

#### Create a Schedule Trigger

```bash
curl -X POST http://localhost:3000/api/triggers \
  -H "Content-Type: application/json" \
  -d '{
    "trigger": {
      "workflowId": "your-workflow-id",
      "type": "schedule",
      "config": {
        "cronExpression": "0 9 * * *",
        "timezone": "America/New_York"
      },
      "isActive": true
    }
  }'
```

### Integrations

Store connection credentials securely in Supabase:

```bash
curl -X POST http://localhost:3000/api/integrations \
  -H "Content-Type: application/json" \
  -d '{
    "integration": {
      "type": "postgres",
      "name": "Production DB",
      "config": {
        "host": "db.example.com",
        "port": 5432,
        "database": "production",
        "user": "admin",
        "password": "secret"
      }
    }
  }'
```

Then reference in Database nodes with `useIntegration: true` and `integrationId`.

## API Endpoints

### Workflows
- `GET /api/workflows` - List user's workflows
- `POST /api/workflows` - Create workflow
- `GET /api/workflows/:id` - Get workflow
- `PUT /api/workflows/:id` - Update workflow
- `DELETE /api/workflows/:id` - Delete workflow
- `POST /api/workflows/:id/execute` - Execute workflow

### Triggers
- `GET /api/triggers` - List triggers
- `POST /api/triggers` - Create trigger
- `DELETE /api/triggers/:id` - Delete trigger

### Webhooks
- `POST /api/webhooks/:triggerId` - Trigger workflow via webhook
- `GET /api/webhooks/:triggerId` - Webhook info

### Integrations
- `GET /api/integrations` - List integrations
- `POST /api/integrations` - Create integration
- `PUT /api/integrations/:id` - Update integration
- `DELETE /api/integrations/:id` - Delete integration

### Executions
- `GET /api/executions` - List executions
- `GET /api/executions/:id` - Get execution details

## Architecture

```
┌─────────────────┐
│   React UI      │  Visual workflow editor
│   (Next.js)     │
└────────┬────────┘
         │ API Calls
         ▼
┌─────────────────┐
│   API Routes    │  /api/workflows, /api/triggers, etc.
│   (Next.js)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ WorkflowEngine  │  Core execution engine
│                 │  - Step orchestration
│                 │  - Context management
│                 │  - Error handling
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Integrations  │  Database, Email, Storage, etc.
│                 │  (Pluggable adapters)
└─────────────────┘

┌─────────────────┐
│   Supabase      │  Persistence layer
│                 │  - Workflows
│                 │  - Triggers
│                 │  - Executions
│                 │  - Integrations
└─────────────────┘
```

## Example Workflows

### 1. Daily Report Generator

```
[Schedule Trigger (9 AM daily)]
    ↓
[Database: Query yesterday's sales]
    ↓
[LLM: Analyze trends and generate summary]
    ↓
[Email: Send report to team]
```

### 2. GitHub Webhook Notifier

```
[Webhook: GitHub push event]
    ↓
[Code: Extract commit info]
    ↓
[Conditional: Is main branch?]
    ├── (Yes) → [HTTP: Notify Slack]
    └── (No) → [Delay: 5 min] → [HTTP: Run tests]
```

### 3. Data Pipeline

```
[HTTP: Receive webhook data]
    ↓
[Transform: Map fields]
    ↓
[Database: Insert into PostgreSQL]
    ↓
[Storage: Backup to S3]
    ↓
[Email: Confirm completion]
```

## Security Considerations

1. **Authentication**: All API routes require user authentication via NextAuth.js
2. **RLS**: Supabase Row Level Security ensures user data isolation
3. **Secrets**: Webhook secrets for verification
4. **Code Execution**: JavaScript code runs in sandboxed environment (with limitations)
5. **Integration Credentials**: Stored in Supabase, consider encryption at rest

## Limitations & Future Improvements

### Current Limitations
- Database operations are simulated (need to install pg/mysql2/mongodb drivers)
- Email sending is simulated (need nodemailer)
- Cloud storage is simulated (need AWS SDK, etc.)
- Code execution uses `with` statement (security risk in production)
- No visual debugging/breakpoints
- Limited error recovery options

### Planned Improvements
- [ ] Full database driver implementations
- [ ] Nodemailer integration for real emails
- [ ] AWS/GCP/Azure SDK integration
- [ ] Workflow versioning
- [ ] Visual execution debugging
- [ ] Bulk operations
- [ ] Workflow templates marketplace
- [ ] Team collaboration features
- [ ] Advanced error handling (retry queues, dead letters)
- [ ] Metrics and monitoring dashboard
- [ ] Webhook signature verification (HMAC)
- [ ] Rate limiting per user
- [ ] Workflow import/export (JSON)

## Testing

Run the development server:

```bash
npm run dev
```

Then:
1. Go to http://localhost:3000
2. Click Workflows tab
3. Create a simple workflow with LLM → Code nodes
4. Save and execute
5. Check execution results in the UI

## Troubleshooting

### "Supabase URL and ANON_KEY must be set"
- Ensure `.env` file exists with Supabase credentials
- Restart the dev server after adding env vars

### "Workflow deadlock detected"
- Check that all dependencies are satisfied
- Ensure no circular dependencies
- Verify step IDs in conditional branches

### Webhook not triggering
- Check trigger is active in database
- Verify webhook URL matches `/api/webhooks/:triggerId`
- Check server logs for errors

### Database operations not working
- Install required database drivers: `npm install pg mysql2 mongodb better-sqlite3`
- Configure connection details in integration or node config
- Ensure database is accessible from server

## Contributing

To add new node types:

1. Add type to `StepType` in `src/workflow.ts`
2. Add config interface in `WorkflowStep`
3. Add `execute<Type>Step` method in `WorkflowEngine`
4. Add node type to `WorkflowEditor` palette
5. Add node renderer and config panel

## License

MIT