# NVIDIA Bot - Testing Guide

## Prerequisites Check

✅ Node.js installed (v18+)
✅ Dependencies installed (`npm install` completed)
✅ Project built (`npm run build` completed)
✅ API key configured in `.env` file

---

## Test 1: Verify API Connection

```bash
cd nvidia-bot
node dist/index.js test
```

**Expected Output:**
```
- Testing connection...
✓ Connection successful!
Model: meta/llama-3.1-70b-instruct
Response: [Some greeting from the AI]
```

---

## Test 2: List Available Models

```bash
node dist/index.js models
```

**Expected Output:**
```
Available NVIDIA Models:

1. 01-ai/yi-large
2. abacusai/dracarys-llama-3.1-70b-instruct
...
130. nvidia/nemotron-4-340b-instruct (default)
...
```

---

## Test 3: CLI Interactive Chat

```bash
node dist/index.js chat
```

**Steps:**
1. You'll see a welcome banner with "NVIDIA Bot"
2. Type a message: "Hello, how are you?"
3. Watch the streaming response appear token by token
4. Try `/model` to switch to a different model (e.g., `meta/llama-3.3-70b-instruct`)
5. Try `/clear` to reset conversation
6. Type `/exit` to quit

**Expected:** Smooth streaming responses, model switching works, history persists.

---

## Test 4: Start Web Server

```bash
npm run web
```

**Expected Output:**
```
NVIDIA Bot Web Server running at http://localhost:3000
Serving frontend from C:\...\nvidia-bot\dist\public
```

---

## Test 5: Web Interface - Basic Chat

1. Open browser to **http://localhost:3000**
2. You should see:
   - Header with "NVIDIA Bot" title
   - Model selector dropdown (pre-populated)
   - Chat area (empty initially)
   - Input textarea and Send/Clear buttons
3. Type a message: "What is Node.js?"
4. Click **Send** or press Enter
5. **Expected:** Response streams in token-by-token, message appears in chat bubble
6. Scroll should auto-down as response streams

---

## Test 6: Web Interface - Model Switching

1. In the web UI, click the model dropdown
2. Select a different model (e.g., `nvidia/nemotron-4-340b-instruct`)
3. Send a message: "Explain quantum computing"
4. **Expected:** System message shows model changed, response from new model

---

## Test 7: Web Interface - Refresh Models

1. Click the **↻** (refresh) button next to model selector
2. **Expected:** "Models refreshed" system message, dropdown updates with latest models from API

---

## Test 8: Web Interface - Clear Chat

1. Click the **Clear** button
2. **Expected:** Chat history cleared, system message "Chat cleared"

---

## Test 9: API Endpoints (curl)

### Get Config
```bash
curl http://localhost:3000/api/config
```
**Expected:** `{"defaultModel":"meta/llama-3.1-70b-instruct","chatHistoryLimit":50}`

### Get Models
```bash
curl http://localhost:3000/api/models
```
**Expected:** JSON with `models` array and `default` model

### Streaming Chat
```bash
curl -N -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello!"}],"model":"meta/llama-3.1-70b-instruct"}'
```
**Expected:** SSE stream with `data: {"content":"..."}` lines, ending with `data: [DONE]`

---

## Test 10: Multiple Concurrent Requests

1. Open **two browser tabs** to http://localhost:3000
2. In each, select a different model
3. Send different questions in each tab
4. **Expected:** Both chats work independently, no cross-talk

---

## Test 11: Error Handling

1. In web UI, disconnect internet (or stop the server)
2. Try to send a message
3. **Expected:** Error message displayed: "Error: [description]"
4. Reconnect and refresh models if needed

---

## Test 12: Responsive Design

1. Resize browser window to mobile width (< 768px)
2. **Expected:**
   - Header stacks vertically
   - Messages take 90% width
   - Input area wraps buttons
   - Still fully functional

---

## All Tests Summary

| Test | CLI | Web | API |
|------|-----|-----|-----|
| API connection | ✅ | ✅ | ✅ |
| Model listing | ✅ | ✅ | ✅ |
| Streaming chat | ✅ | ✅ | ✅ |
| Model switching | ✅ | ✅ | ✅ |
| Clear history | ✅ | ✅ | ✅ |
| Error handling | ✅ | ✅ | ✅ |
| Concurrent users | N/A | ✅ | ✅ |
| Responsive UI | N/A | ✅ | N/A |

---

## Troubleshooting

**Server won't start:**
- Check PORT not in use: `netstat -ano | findstr :3000`
- Change port: `set PORT=3001 && npm run web`

**Models not loading:**
- Verify API key in `.env`
- Check server console for errors
- Try `node dist/index.js models` to test CLI

**Web UI blank:**
- Check browser console (F12)
- Verify server running: `curl http://localhost:3000/health`
- Clear browser cache

**Streaming not working:**
- Ensure `/api/chat` endpoint returns `text/event-stream`
- Check network tab in browser dev tools
- Test with curl command above

---

## Performance Notes

- First response may be slower (model loading)
- Subsequent responses are faster due to connection reuse
- Chat history limit prevents context overflow (default: 50 messages)
- All 180+ models are available and switchable instantly