# NVIDIA Bot

A full-featured chatbot using NVIDIA's free models via the NVIDIA API. Includes both CLI and web interfaces with advanced workflow orchestration.

## Features

- **Dual Interface**: CLI and Web (browser-based) chat interfaces
- **Streaming Responses**: Real-time token-by-token output
- **180+ Models**: Support for all NVIDIA catalog models (Llama, Nemotron, Gemma, Phi, DeepSeek, Codestral, etc.)
- **Model Selection**: Dropdown to switch models on the fly
- **Chat History**: Persistent conversation context with configurable limit
- **Workflow Orchestration**: Multi-step workflows with dependencies, conditionals, and more
- **Modern UI**: Beautiful, responsive web interface with gradient design
- **REST API**: Backend server with endpoints for chat, models, config, and workflows
- **Easy Configuration**: `.env` file for API key and settings

## Prerequisites

- Node.js 18+
- NVIDIA API key (free from [NVIDIA API Catalog](https://integrate.api.nvidia.com))

## Installation

```bash
cd nvidia-bot
npm install
npm run build
```

## Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` and add your NVIDIA API key:
   ```
   NVIDIA_API_KEY=nvapi-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. Optional: Change default model or other settings:
   ```
   DEFAULT_MODEL=meta/llama-3.1-70b-instruct
   CHAT_HISTORY_LIMIT=50
   ```

## Usage

### CLI Interface

Start interactive chat:
```bash
npm run start
# or for development:
npm run dev
```

CLI commands during chat:
- `/clear` - Clear chat history
- `/model` - Switch to a different model
- `/exit` or `/quit` - Exit the bot

List available models:
```bash
nvidia-bot models
```

Test API connection:
```bash
nvidia-bot test
```

### Web Interface

Start the web server:
```bash
npm run web
# or for development with hot reload:
npm run web:dev
```

Open your browser to: **http://localhost:3000**

Web features:
- Real-time streaming responses
- Model selector dropdown (with refresh button)
- Chat history display
- Clear chat button
- **Workflow tab** with visual editor and execution monitor
- Responsive design for mobile and desktop

## Workflow Orchestration

NVIDIA Bot now supports multi-step workflow orchestration!

### Quick Example

```json
{
  "id": "my-workflow",
  "name": "Analysis Workflow",
  "steps": [
    {
      "id": "analyze",
      "type": "llm",
      "llmConfig": {
        "systemPrompt": "You are an analyst.",
        "content": "Analyze: '${input}'"
      }
    },
    {
      "id": "process",
      "type": "code",
      "dependsOn": ["analyze"],
      "codeConfig": {
        "language": "javascript",
        "code": "return { length: context.analyze.response.length };"
      }
    }
  ]
}
```

### Run Workflows

**Web UI**: Open the "Workflows" tab in the web interface
**CLI**: `nvidia-bot workflow-run my-workflow.json`
**API**: `POST /api/workflows` with workflow definition

See [WORKFLOWS.md](./WORKFLOWS.md) for complete documentation.

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Send chat message (streaming or non-streaming) |
| `/api/models` | GET | List all available models |
| `/api/config` | GET | Get current configuration |
| `/api/workflows` | POST | Start a workflow execution |
| `/api/workflows` | GET | List all executions |
| `/api/workflows/:id` | GET | Get execution details |
| `/api/workflows/:id/stop` | POST | Stop a running execution |
| `/health` | GET | Health check endpoint |

### Chat API Example

```bash
curl -N -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello!"}],"model":"meta/llama-3.1-70b-instruct"}'
```

## Available Models

The bot automatically fetches all available models from the NVIDIA API. Some popular ones:

- `meta/llama-3.1-70b-instruct` - Meta's Llama 3.1 (70B)
- `meta/llama-3.3-70b-instruct` - Latest Llama 3.3
- `nvidia/nemotron-4-340b-instruct` - NVIDIA's largest instruct model
- `nvidia/llama-3.1-nemotron-70b-instruct` - NVIDIA-tuned Llama
- `mistralai/mistral-large` - Mistral's flagship model
- `google/gemma-2-9b-it` - Google's Gemma 2
- `microsoft/phi-3.5-mini-instruct` - Microsoft's Phi-3.5
- `deepseek-ai/deepseek-r1` - DeepSeek reasoning model

See full list with: `nvidia-bot models` or the web interface dropdown.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NVIDIA_API_KEY` | Your NVIDIA API key (required) | - |
| `NVIDIA_BASE_URL` | NVIDIA API endpoint | `https://integrate.api.nvidia.com/v1` |
| `DEFAULT_MODEL` | Default model for chat | `meta/llama-3.1-70b-instruct` |
| `CHAT_HISTORY_LIMIT` | Max messages in context | `50` |
| `PORT` | Web server port | `3000` |

## Project Structure

```
nvidia-bot/
├── src/
│   ├── index.ts        # CLI entry point
│   ├── web-server.ts   # Express web server
│   ├── config.ts       # Configuration management
│   ├── nvidia-client.ts # NVIDIA API client
│   ├── chat.ts         # Chat session management
│   └── public/         # Web frontend
│       ├── index.html
│       ├── styles.css
│       └── app.js
├── .env                # Your configuration (create from .env.example)
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Troubleshooting

**Error: NVIDIA_API_KEY is not set**
- Ensure you've copied `.env.example` to `.env`
- Add your API key to the `.env` file

**API connection errors (404)**
- Some models have different naming conventions. Use the model list from `nvidia-bot models` to see valid model IDs
- The API key must have access to the selected model

**Port already in use**
- Change the `PORT` environment variable: `set PORT=3001 && npm run web`

**Web interface not loading**
- Check the server is running: `npm run web`
- Verify no firewall blocking port 3000
- Check browser console for errors

## License

MIT