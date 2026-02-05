# Workflow Automation System

A powerful n8n-like workflow automation platform built with Next.js, React Flow, and Supabase. Create, execute, and monitor complex automated workflows with 11+ node types including LLM, HTTP, Database, Email, Storage, and more.

## Features

### Visual Workflow Editor
- Drag-and-drop interface using React Flow
- 11+ node types with distinct visual styles
- Real-time connection visualization
- Properties panel for detailed configuration
- Save and load workflows

### Node Types
1. **LLM** - Call NVIDIA AI models (Llama, Nemotron, Phi-3, Gemma, Mixtral)
2. **HTTP** - Make HTTP requests with templating
3. **Code** - Execute JavaScript/TypeScript code
4. **Database** - Query PostgreSQL, MySQL, MongoDB, MSSQL, SQLite
5. **Email** - Send emails via SMTP
6. **Storage** - Cloud storage operations (S3, GCS, Azure Blob, FTP/SFTP)
7. **Webhook** - Send webhooks to external services
8. **Transform** - Map, filter, and sort data
9. **Conditional** - Branch execution based on conditions
10. **Delay** - Wait for specified time
11. **File** - File system operations

### Supabase Integration
- Full database persistence
- User authentication and authorization
- Execution tracking and history
- Integration credential management
- Row Level Security (RLS) enabled

### Trigger Types
- **Webhook** - Trigger workflows via HTTP POST
- **Schedule** - Cron-based scheduling (coming soon)
- **Event** - Event-driven triggers (coming soon)

### Execution Features
- Topological dependency resolution
- Context passing between steps
- Output mapping to context variables
- Error handling and retry logic
- Real-time execution tracking
- Step-by-step result inspection

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, React Flow
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI**: NVIDIA NIM API
- **Authentication**: NextAuth.js with Supabase

## Setup

### Prerequisites
- Node.js 18+
- Supabase account
- NVIDIA API key

### Installation

1. Clone and install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
# NVIDIA AI API
NVIDIA_API_KEY=your-nvidia-api-key
NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
DEFAULT_MODEL=meta/llama-3.1-70b-instruct

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. Set up Supabase database:
```bash
# Run the migration script in your Supabase SQL editor
supabase/migrations/001_initial_workflow_schema.sql
```

4. Enable NextAuth.js:
```bash
# Install next-auth
npm install next-auth
```

Configure `src/app/api/auth/[...nextauth]/route.ts` (create if needed).

5. Run development server:
```bash
npm run dev
```

Open http://localhost:3000

## Usage

### Creating a Workflow

1. Click "Create Workflow"
2. Drag nodes from the left palette onto the canvas
3. Connect nodes by dragging from output to input handles
4. Click a node to configure its properties
5. Set output mappings to pass data between steps
6. Click "Save" to store in database
7. Click "Execute" to run immediately

### Example: LLM Processing Pipeline

```
Webhook Trigger (optional)
    ↓
HTTP Request (fetch data)
    ↓
Transform (extract fields)
    ↓
LLM (process with AI)
    ↓
Email (send results)
```

### Template Variables

Use `${variable}` syntax to reference context:
- `${input}` - Original workflow input
- `${context.key}` - Context variable
- `${stepResults.stepId.output}` - Previous step output

Example: `Hello ${context.name}, your order ${input.orderId} is ready`

### Integration Management

Create stored integrations for reusable credentials:

```json
POST /api/integrations
{
  "type": "postgres",
  "name": "Production DB",
  "config": {
    "host": "db.example.com",
    "port": 5432,
    "database": "prod",
    "username": "user",
    "password": "pass"
  }
}
```

Then reference in Database nodes by checking "Use Stored Integration".

### Webhook Triggers

1. Create a trigger:
```json
POST /api/triggers
{
  "workflowId": "your-workflow-id",
  "type": "webhook",
  "config": {}
}
```

2. Get trigger URL from response: `/api/webhooks/{triggerId}`
3. Send POST requests to trigger workflow:
```bash
curl -X POST https://your-app.com/api/webhooks/{triggerId} \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```

## API Endpoints

### Workflows
- `GET /api/workflows` - List workflows
- `POST /api/workflows` - Create/update workflow
- `GET /api/workflows/[id]` - Get workflow
- `PUT /api/workflows/[id]` - Update workflow
- `DELETE /api/workflows/[id]` - Delete workflow
- `POST /api/workflows/[id]/execute` - Execute workflow

### Triggers
- `GET /api/triggers` - List triggers
- `POST /api/triggers` - Create trigger

### Webhooks
- `POST /api/webhooks/[triggerId]` - Trigger workflow
- `GET /api/webhooks/[triggerId]` - Get trigger info

### Integrations
- `GET /api/integrations` - List integrations
- `POST /api/integrations` - Create integration
- `GET /api/integrations/[id]` - Get integration
- `PUT /api/integrations/[id]` - Update integration
- `DELETE /api/integrations/[id]` - Delete integration

## Database Schema

### Tables

**workflows**
- `id` (UUID, PK)
- `user_id` (UUID, FK to auth.users)
- `name`, `description`
- `definition` (JSONB) - Full workflow definition
- `tags` (text[]), `is_active` (boolean)
- `created_at`, `updated_at`

**triggers**
- `id`, `user_id`, `workflow_id` (FK)
- `type` (webhook/schedule/event)
- `config` (JSONB), `is_active`
- `last_triggered_at`, `created_at`

**executions**
- `id`, `user_id`, `workflow_id`
- `workflow_version`, `status`
- `input_context`, `output_context` (JSONB)
- `step_results` (JSONB), `error`
- `started_at`, `completed_at`, `created_at`

**integrations**
- `id`, `user_id`, `type`, `name`
- `config` (JSONB) - Encrypted in production
- `is_active`, `created_at`, `updated_at`

All tables have Row Level Security enabled.

## Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── workflows/          # Workflow CRUD + execute
│   │   ├── triggers/           # Trigger management
│   │   ├── webhooks/[triggerId]/  # Webhook endpoints
│   │   └── integrations/       # Integration CRUD
│   └── page.tsx                # Main UI
├── components/
│   ├── WorkflowEditor.tsx      # Main editor canvas
│   ├── WorkflowNode.tsx        # Custom node component
│   ├── NodePalette.tsx         # Draggable node palette
│   └── PropertiesPanel.tsx     # Node configuration
├── lib/
│   └── supabase.ts             # Supabase service layer
├── workflow-engine.ts          # Execution engine
└── workflow.ts                 # Type definitions
```

## Security Notes

- Code execution uses `eval()` in a basic sandbox - use `vm2` or `isolated-vm` in production
- Integration credentials stored in plain text - encrypt in production
- Webhook endpoints are public - add signature verification
- Implement proper rate limiting
- Add input validation and sanitization
- Enable audit logging

## Production Considerations

1. **Security**
   - Replace `eval()` with proper sandbox (vm2, isolated-vm)
   - Encrypt integration configs
   - Add webhook signature verification
   - Implement rate limiting
   - Add request validation

2. **Performance**
   - Add Redis caching for integrations
   - Implement workflow step caching
   - Use queue system for async execution
   - Add database connection pooling

3. **Reliability**
   - Add retry logic with exponential backoff
   - Implement circuit breakers
   - Add dead letter queue
   - Set up monitoring and alerting

4. **Scalability**
   - Horizontal scaling with stateless workers
   - Database read replicas
   - CDN for static assets
   - Edge functions for webhooks

## Testing

```bash
# Run tests
npm test

# Build
npm run build

# Start production
npm start
```

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Submit a pull request

## Support

For issues and feature requests, please use the GitHub Issues page.