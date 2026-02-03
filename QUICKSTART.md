# Monnu Bot - Quick Start Guide

## What is Monnu Bot?

Monnu Bot is a powerful AI chatbot that uses NVIDIA's free models. It features:
- **Web Interface** - Beautiful green-themed UI (like molt bot)
- **CLI Interface** - Terminal-based chat
- **180+ AI Models** - All NVIDIA catalog models
- **Streaming Responses** - Real-time token-by-token output
- **Model Switching** - Change models on the fly

---

## Access the Web Interface

**URL:** http://localhost:3000

The web server is **already running**. Just open your browser!

### Web UI Features:
- Green gradient theme with "Monnu Bot" branding
- Model selector dropdown (180+ models)
- Real-time streaming responses
- Clear chat button
- Responsive design (works on mobile)

---

## CLI Commands

### Test API Connection
```bash
cd nvidia-bot
node dist/index.js test
```

### List All Models
```bash
node dist/index.js models
```

### Start Interactive Chat
```bash
node dist/index.js chat
```

**CLI Commands during chat:**
- `/clear` - Clear conversation history
- `/model` - Switch to a different model
- `/exit` or `/quit` - Exit the bot

---

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `GET /` | Web UI | Main chat interface |
| `GET /api/models` | List all models |
| `POST /api/chat` | Send message (streaming) |
| `GET /api/config` | Get current config |
| `GET /health` | Health check |

---

## Configuration

Edit [`nvidia-bot/.env`](nvidia-bot/.env):

```env
NVIDIA_API_KEY=nvapi-xxxxxxxx (already set)
DEFAULT_MODEL=meta/llama-3.1-70b-instruct
CHAT_HISTORY_LIMIT=50
PORT=3000
```

---

## Testing Checklist

✅ Web UI loads at http://localhost:3000
✅ Green theme applied (header, buttons, user messages)
✅ "Monnu Bot" title displayed
✅ Model selector shows 180+ models
✅ Send message and see streaming response
✅ Clear button works
✅ Model switching works

---

## Troubleshooting

**Port 3000 in use?**
```bash
# Change port in .env file:
PORT=3001
# Then restart server:
npm run web
```

**Static files not loading?**
```bash
# Copy files to dist:
copy src\public\* dist\public\
```

**API errors?**
- Verify API key in `.env`
- Test with CLI: `node dist/index.js test`
- Check model name from `node dist/index.js models`

---

## Project Structure

```
nvidia-bot/
├── src/
│   ├── index.ts        # CLI
│   ├── web-server.ts   # Express server
│   ├── config.ts       # Config loader
│   ├── nvidia-client.ts # API client
│   ├── chat.ts         # Chat logic
│   └── public/         # Web UI
│       ├── index.html
│       ├── styles.css  # Green theme
│       └── app.js
├── dist/               # Compiled files
├── .env                # Your config
├── README.md           # Full docs
├── TESTING.md          # Detailed tests
└── QUICKSTART.md       # This file
```

---

## Next Steps

1. Open http://localhost:3000 in your browser
2. Select a model from the dropdown
3. Type a message and press Enter
4. Enjoy chatting with Monnu Bot!

---

**Powered by NVIDIA AI** | **Green Theme** | **180+ Models**