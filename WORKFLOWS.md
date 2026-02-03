# Workflow Orchestration

Multi-step workflow orchestration allows you to define, execute, and monitor complex sequences of operations with dependencies, conditionals, and various step types.

## Features

- **Sequential Execution**: Steps execute in order with dependency resolution
- **Multiple Step Types**: LLM calls, code execution, conditionals, delays, HTTP requests, file operations
- **Dependency Management**: Explicit step dependencies ensure proper execution order
- **Retry Policy**: Configurable retry logic with backoff
- **State Persistence**: Automatic persistence and recovery across restarts
- **Real-time Monitoring**: Live status updates via polling
- **REST API**: Full CRUD operations for workflow management
- **CLI Support**: Command-line interface for workflow operations
- **Web UI**: Visual workflow editor and execution monitor

## Quick Start

### 1. Basic Workflow Definition

Create a JSON file with your workflow:

```json
{
  "id": "my-workflow",
  "name": "My First Workflow",
  "description": "A simple example",
  "version": "1.0.0",
  "steps": [
    {
      "id": "step1",
      "type": "llm",
      "name": "Generate greeting",
      "llmConfig": {
        "model": "meta/llama-3.1-70b-instruct",
        "systemPrompt": "You are a helpful assistant.",
        "content": "Hello! Please provide a friendly greeting."
      }
    }
  ]
}
```

### 2. Run via Web UI

1. Start the web server: `npm run web`
2. Open http://localhost:3000
3. Click the "Workflows" tab
4. Paste your workflow JSON into the editor
5. Click "Run Workflow"
6. Watch execution in real-time

### 3. Run via CLI

```bash
nvidia-bot workflow-run examples/workflows/simple-greeting.json
```

### 4. Run via API

```bash
curl -X POST http://localhost:3000/api/workflows \
  -H "Content-Type: application/json" \
  -d @my-workflow.json
```

## Workflow Definition Schema

### Top-Level Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique workflow identifier |
| `name` | string | Yes | Human-readable name |
| `description` | string | No | Workflow description |
| `version` | string | No | Version string (default: "1.0.0") |
| `steps` | array | Yes | Array of workflow steps |
| `globalContext` | object | No | Initial context variables |
| `retryPolicy` | object | No | Retry configuration |
| `timeoutMs` | number | No | Workflow timeout in milliseconds (default: 300000) |

### Retry Policy

```json
"retryPolicy": {
  "maxRetries": 3,
  "backoffMs": 1000
}
```

### Step Types

#### 1. LLM Step

Calls the NVIDIA AI model.

```json
{
  "id": "generate-text",
  "type": "llm",
  "name": "Generate Response",
  "llmConfig": {
    "model": "meta/llama-3.1-70b-instruct",
    "systemPrompt": "You are a helpful assistant.",
    "content": "Your prompt here with ${variables}"
  },
  "outputMapping": {
    "responseText": "response"
  }
}
```

**LLM Config Fields:**
- `model` (optional): Model ID, uses default if omitted
- `systemPrompt` (optional): System message
- `content` (optional): User message content (supports `${template}` variables)
- `temperature`, `maxTokens` (future): Advanced parameters

**Output Mapping:**
Maps the step output to context keys. The LLM response is available as `output.response`.

#### 2. Code Step

Executes JavaScript/TypeScript code in a sandboxed environment.

```json
{
  "id": "process-data",
  "type": "code",
  "name": "Transform Data",
  "codeConfig": {
    "language": "javascript",
    "code": "const input = context.inputText;\nreturn { processed: true, length: input.length };"
  }
}
```

**Code Config Fields:**
- `language`: Currently only "javascript" or "typescript"
- `code`: JavaScript code to execute
- `timeoutMs` (optional): Execution timeout (default: 30000)

**Available in code:**
- `context`: Full workflow context object
- `console.log()`: Logging (captured in output)
- Return value becomes step output

#### 3. Conditional Step

Branches execution based on a JavaScript expression.

```json
{
  "id": "check-result",
  "type": "conditional",
  "name": "Check Condition",
  "conditionalConfig": {
    "condition": "context.sentiment && context.sentiment.response.includes('positive')",
    "thenStepId": "positive-branch",
    "elseStepId": "negative-branch"
  }
}
```

**Conditional Config Fields:**
- `condition`: JavaScript expression evaluating to boolean
- `thenStepId`: Step ID to execute if condition is true
- `elseStepId`: Step ID to execute if condition is false (optional)

**Output:**
Returns `{ branch: 'then'|'else', nextStepId, conditionResult }`

#### 4. Delay Step

Pauses execution for a specified duration.

```json
{
  "id": "wait",
  "type": "delay",
  "name": "Wait 5 seconds",
  "delayConfig": {
    "milliseconds": 5000
  }
}
```

**Delay Config Fields:**
- `milliseconds`: Delay duration

#### 5. HTTP Step

Makes HTTP requests.

```json
{
  "id": "fetch-data",
  "type": "http",
  "name": "Get External Data",
  "httpConfig": {
    "url": "https://api.example.com/data?query=${query}",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer ${token}"
    },
    "timeoutMs": 10000
  }
}
```

**HTTP Config Fields:**
- `url`: Request URL (supports templates)
- `method`: GET, POST, PUT, DELETE (default: GET)
- `headers`: Optional headers object
- `body`: Optional request body (for POST/PUT)
- `timeoutMs`: Request timeout (default: 30000)

#### 6. File Step

File system operations (read, write, delete).

```json
{
  "id": "read-config",
  "type": "file",
  "name": "Read Configuration",
  "fileConfig": {
    "operation": "read",
    "path": "/tmp/config.json"
  }
}
```

**File Config Fields:**
- `operation`: "read", "write", or "delete"
- `path`: File path (supports templates)
- `content`: Required for write operations

### Step Dependencies

Control execution order with `dependsOn`:

```json
{
  "id": "step2",
  "type": "llm",
  "name": "Second Step",
  "dependsOn": ["step1", "step1a"],
  "llmConfig": {
    "content": "Continue from previous results"
  }
}
```

A step executes only after all its dependencies complete successfully.

### Output Mapping

Map step outputs to context variables:

```json
{
  "outputMapping": {
    "summary": "response",
    "wordCount": "response.split(' ').length"
  }
}
```

The left side is the context key, the right side is a path into the step output (supports dot notation).

## Context System

The workflow context is a shared data store accessible to all steps:

```typescript
interface WorkflowContext {
  [key: string]: any;           // Custom variables
  _stepResults: Record<string, StepResult>;  // All step results
  _workflowId: string;         // Execution ID
  _currentStepId?: string;     // Currently executing step
}
```

### Template Variables

Use `${variable}` syntax in step configurations to reference context:

- `${input}`: The initial input passed to the workflow
- `${stepId.response}`: Output from a specific step
- `${nested.value}`: Nested context properties

## API Reference

### POST /api/workflows

Start a new workflow execution.

**Request Body:** WorkflowDefinition JSON

**Response:**
```json
{
  "success": true,
  "executionId": "wf_1234567890_abc123",
  "status": "running",
  "workflowId": "my-workflow"
}
```

### GET /api/workflows

List all workflow executions.

**Response:**
```json
{
  "executions": [
    {
      "id": "wf_1234567890_abc123",
      "workflowId": "my-workflow",
      "status": "running",
      "startedAt": "2025-02-03T13:00:00.000Z",
      "completedAt": null,
      "stepCount": 3,
      "error": null
    }
  ]
}
```

### GET /api/workflows/:executionId

Get detailed execution information.

**Response:**
```json
{
  "id": "wf_1234567890_abc123",
  "workflowId": "my-workflow",
  "status": "running",
  "context": { ... },
  "stepResults": [ ... ],
  "queuedSteps": ["step3", "step4"],
  "completedSteps": ["step1", "step2"],
  "startedAt": "2025-02-03T13:00:00.000Z",
  "completedAt": null,
  "error": null
}
```

### POST /api/workflows/:executionId/stop

Stop a running workflow.

**Response:**
```json
{
  "success": true,
  "message": "Workflow stopped"
}
```

### POST /api/workflows/cleanup

Clean up old workflow executions.

**Request Body:**
```json
{
  "maxAgeDays": 7
}
```

## CLI Commands

### `nvidia-bot workflow-run <definitionFile>`

Run a workflow from a JSON file.

Options:
- `-o, --output <file>`: Save execution details to file

Example:
```bash
nvidia-bot workflow-run my-workflow.json -o result.json
```

### `nvidia-bot workflow-list`

List all workflow executions.

### `nvidia-bot workflow-status <executionId>`

Show detailed status of a specific execution.

### `nvidia-bot workflow-stop <executionId>`

Stop a running execution.

## Persistence

Workflow executions are automatically persisted to disk:

- **Location**: `nvidia-bot/dist/workflow-data/` (created automatically)
- **Format**: JSON files named by execution ID
- **Recovery**: Executions are loaded on server startup
- **Cleanup**: Use `/api/workflows/cleanup` or call `engine.cleanupOldExecutions()`

## Error Handling

### Partial Failures

If a step fails:
1. The failure is recorded in `stepResults`
2. Retry policy is checked (if configured)
3. If retries exhausted, workflow fails
4. Other independent steps may continue (depending on dependencies)

### Error Information

Each `StepResult` includes:
- `status`: "success" | "failed" | "skipped" | "timeout"
- `error`: Error message if failed
- `startedAt`, `completedAt`: Timing information
- `durationMs`: Execution duration

### Monitoring

Check workflow status:
```bash
nvidia-bot workflow-status wf_1234567890_abc123
```

Or via API:
```bash
curl http://localhost:3000/api/workflows/wf_1234567890_abc123
```

## Best Practices

1. **Start Simple**: Begin with 2-3 step workflows and gradually add complexity
2. **Use Dependencies**: Explicitly define dependencies for clarity and safety
3. **Set Timeouts**: Configure appropriate timeouts for long-running workflows
4. **Add Retries**: Use retry policy for steps that may fail transiently
5. **Monitor Resources**: Be mindful of API rate limits and resource usage
6. **Test Incrementally**: Test each step individually before combining
7. **Use Templates**: Leverage `${template}` syntax for dynamic values
8. **Handle Errors**: Design workflows to handle failures gracefully

## Security Considerations

⚠️ **Important**: Workflow execution has security implications:

- **Code Steps**: Execute JavaScript in a sandbox, but be cautious with untrusted code
- **File Access**: File steps can read/write/delete files - restrict permissions appropriately
- **HTTP Requests**: Can make arbitrary HTTP calls - consider network isolation
- **Template Injection**: Template variables are evaluated in context - validate inputs
- **Production**: Consider additional sandboxing, rate limiting, and authentication

## Examples

See the `examples/workflows/` directory for complete examples:

- `simple-greeting.json`: Basic LLM call
- `conditional-processing.json`: Branching logic
- `multi-step-processing.json`: Sequential processing with code
- `delayed-execution.json`: Delays and multiple models

## Troubleshooting

### Workflow stuck in "running"
- Check for deadlocks (circular dependencies)
- Verify all steps have proper dependencies
- Check server logs for errors

### Step failing repeatedly
- Verify LLM model is available
- Check API key and rate limits
- Review step configuration
- Consider increasing timeout

### Context variables not resolving
- Ensure variable exists in context
- Check template syntax: `${variable}`
- Verify outputMapping is configured correctly

### Persistence not working
- Check write permissions on `workflow-data` directory
- Verify disk space
- Check server logs for persistence errors

## Advanced Usage

### Custom Step Types

Extend the WorkflowEngine by adding new step types:

```typescript
// In workflow-engine.ts, add to executeStep method:
case 'custom':
    output = await this.executeCustomStep(step, context);
    break;

// Implement the method:
private async executeCustomStep(step: WorkflowStep, context: WorkflowContext): Promise<any> {
    // Your custom logic
}
```

### Streaming Callbacks

Add real-time progress callbacks:

```typescript
const engine = new WorkflowEngine(client, {
    onStepStart: (execution, step) => {
        console.log(`Step ${step.id} started`);
    },
    onStepComplete: (execution, step, result) => {
        console.log(`Step ${step.id} completed in ${result.durationMs}ms`);
    }
});
```

### Parallel Execution

Configure concurrent step execution:

```typescript
const engine = new WorkflowEngine(client, {
    maxConcurrentSteps: 3  // Run up to 3 steps in parallel
});
```

Ensure steps have proper dependencies to avoid race conditions.

## Performance Tips

- Use smaller/faster models for preliminary steps
- Cache results in context to avoid redundant LLM calls
- Set appropriate timeouts to prevent hanging
- Use code steps for simple transformations instead of LLM calls
- Clean up old executions regularly

## Future Enhancements

Planned features:
- Visual workflow designer in web UI
- Step-level retry policies
- Parallel execution with worker pools
- Webhook triggers
- Scheduled workflows
- Workflow templates library
- Step-level timeouts
- Progress streaming via WebSocket
- Import/export workflow definitions
