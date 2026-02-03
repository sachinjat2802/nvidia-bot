// Moonu Bot - Modern UI with Gemini-inspired design

// Chat elements
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('file-input');
const filePreview = document.getElementById('file-preview');
const modelSelect = document.getElementById('model-select');
const refreshModelsBtn = document.getElementById('refresh-models');
const typingIndicator = document.getElementById('typing-indicator');
const historyList = document.getElementById('history-list');
const newChatBtn = document.getElementById('new-chat-btn');

// Workflow elements
const tabBtns = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
const workflowDefinition = document.getElementById('workflow-definition');
const loadWorkflowBtn = document.getElementById('load-workflow-btn');
const runWorkflowBtn = document.getElementById('run-workflow-btn');
const clearWorkflowBtn = document.getElementById('clear-workflow-btn');
const workflowFileInput = document.getElementById('workflow-file-input');
const executionsList = document.getElementById('executions-list');
const refreshExecutionsBtn = document.getElementById('refresh-executions-btn');
const executionModal = document.getElementById('execution-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalBody = document.getElementById('modal-body');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const sidebar = document.querySelector('.chat-sidebar');

// State
let currentModel = '';
let chatHistory = [];
let uploadedFiles = [];
let currentSessionId = null;
let selectedExecutionId = null;
let executionPollingIntervals = new Map();

// Auto-resize textarea
messageInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 200) + 'px';
});

// Tab switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;

        tabBtns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(`${tabId}-panel`).classList.add('active');

        if (tabId === 'workflows') {
            refreshExecutions();
        }
    });
});

// Chat functions
async function loadConfig() {
    try {
        const res = await fetch('/api/config');
        const config = await res.json();
        currentModel = config.defaultModel;
    } catch (error) {
        console.error('Failed to load config:', error);
    }
}

async function loadModels() {
    try {
        const res = await fetch('/api/models');
        const data = await res.json();
        modelSelect.innerHTML = '';

        // Sort by display name (alias if available)
        data.models.sort((a, b) => {
            const nameA = a.displayName || a.id;
            const nameB = b.displayName || b.id;
            return nameA.localeCompare(nameB);
        }).forEach(model => {
            const option = document.createElement('option');
            option.value = model.id;
            option.textContent = model.displayName || model.id;
            option.title = model.alias ? `${model.alias.description} (${model.alias.alias}) - ${model.id}` : model.id;
            if (model.id === data.default) {
                option.selected = true;
                currentModel = model.id;
            }
            modelSelect.appendChild(option);
        });

        if (!data.default && data.models.length > 0) {
            currentModel = data.models[0].id;
            modelSelect.value = currentModel;
        }
    } catch (error) {
        console.error('Failed to load models:', error);
        showSystemMessage('Failed to load models');
    }
}

// Configure marked options
// marked is loaded from CDN in index.html
if (window.marked) {
    marked.use({
        breaks: true,
        gfm: true
    });
}

function addMessage(content, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    // Create inner structure based on role
    if (role === 'assistant') {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'model-icon'; // Gemini sparkle icon placeholder
        messageDiv.appendChild(iconDiv);
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = role === 'assistant' ? 'message-content markdown-body' : 'message-content';

    if (role === 'assistant') {
        // Parse Markdown for assistant
        contentDiv.innerHTML = marked.parse(content);
        // Apply syntax highlighting to code blocks
        contentDiv.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    } else {
        // User text is plain text (but preserve newlines)
        contentDiv.textContent = content;
        contentDiv.style.whiteSpace = 'pre-wrap';
    }

    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom (smooth)
    // messagesContainer.scrollTo({ top: messagesContainer.scrollHeight, behavior: 'smooth' });
    // Instant scroll looks better for appearing messages
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (role === 'user') {
        chatHistory.push({ role: 'user', content });
    } else if (role === 'assistant') {
        chatHistory.push({ role: 'assistant', content });
    }
}

function showSystemMessage(content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message system';
    messageDiv.textContent = content;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function clearChat() {
    chatHistory = [];
    messagesContainer.innerHTML = '';
    showSystemMessage('Chat cleared');
}

// Session Management
async function loadSessions() {
    try {
        const res = await fetch('/api/sessions');
        const data = await res.json();
        renderSessionsList(data.sessions);
    } catch (error) {
        console.error('Failed to load sessions:', error);
    }
}

function renderSessionsList(sessions) {
    historyList.innerHTML = '';
    sessions.forEach(session => {
        const item = document.createElement('div');
        item.className = `history-item ${session.id === currentSessionId ? 'active' : ''}`;

        const date = new Date(session.updatedAt);
        const dateStr = date.toLocaleDateString() === new Date().toLocaleDateString()
            ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : date.toLocaleDateString();

        item.innerHTML = `
            <div class="history-item-title" title="${session.title}">${session.title}</div>
            <div class="history-item-date">${dateStr}</div>
        `;
        item.addEventListener('click', () => loadSession(session.id));
        historyList.appendChild(item);
    });
}

async function loadSession(id) {
    try {
        const res = await fetch(`/api/sessions/${id}`);
        if (!res.ok) throw new Error('Failed to load session');

        const session = await res.json();
        currentSessionId = session.id;
        chatHistory = session.messages;

        // Re-render UI
        messagesContainer.innerHTML = '';
        chatHistory.forEach(msg => {
            if (msg.role !== 'system') {
                addMessage(msg.content, msg.role);
            }
        });

        loadSessions(); // Update active state in list
    } catch (error) {
        console.error(error);
        showSystemMessage('Error loading chat');
    }
}

function createNewChat() {
    currentSessionId = null;
    clearChat();
    loadSessions();
    messageInput.focus();
}

async function saveCurrentSession() {
    // Generate title from first user message if new
    let title = 'New Chat';
    const firstUserMsg = chatHistory.find(m => m.role === 'user');
    if (firstUserMsg) {
        title = firstUserMsg.content.substring(0, 30) + (firstUserMsg.content.length > 30 ? '...' : '');
    }

    if (!currentSessionId) {
        // Create new
        try {
            const res = await fetch('/api/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, messages: chatHistory })
            });
            const session = await res.json();
            currentSessionId = session.id;
            loadSessions();
        } catch (e) {
            console.error('Failed to create session', e);
        }
    } else {
        // Update existing
        try {
            await fetch(`/api/sessions/${currentSessionId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: chatHistory })
            });
            loadSessions(); // Update timestamp/order
        } catch (e) {
            console.error('Failed to save session', e);
        }
    }
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function updateFilePreview() {
    filePreview.innerHTML = '';
    uploadedFiles.forEach((uf, index) => {
        const item = document.createElement('div');
        item.className = 'file-preview-item';
        item.innerHTML = `
            <span>📄</span>
            <span class="file-name" title="${uf.file.originalname}">${uf.file.originalname}</span>
            <span class="file-size">(${formatFileSize(uf.file.size)})</span>
            <button class="remove-file" data-index="${index}">×</button>
        `;
        filePreview.appendChild(item);
    });

    document.querySelectorAll('.remove-file').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            uploadedFiles.splice(index, 1);
            updateFilePreview();
        });
    });
}

async function handleFileUpload(files) {
    const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Upload failed');
            }

            const result = await response.json();
            return {
                file: {
                    filename: result.file.filename,
                    originalname: result.file.originalname,
                    mimetype: result.file.mimetype,
                    size: result.file.size
                },
                extractedText: result.extractedText
            };
        } catch (error) {
            console.error('Upload error:', error);
            showSystemMessage(`Failed to upload ${file.name}: ${error.message}`);
            return null;
        }
    });

    const results = await Promise.all(uploadPromises);
    const successful = results.filter(r => r !== null);

    if (successful.length > 0) {
        uploadedFiles.push(...successful);
        updateFilePreview();
        showSystemMessage(`Uploaded ${successful.length} file(s)`);
    }
}

async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message && uploadedFiles.length === 0) return;

    let fullMessage = message;
    if (uploadedFiles.length > 0) {
        const fileContents = uploadedFiles.map(uf => {
            return `[File: ${uf.file.originalname}]\n${uf.extractedText}`;
        }).join('\n\n');
        fullMessage = fileContents + (message ? '\n\n' + message : '');
    }

    addMessage(fullMessage, 'user');
    messageInput.value = '';
    messageInput.style.height = 'auto';
    uploadedFiles = [];
    updateFilePreview();
    sendBtn.disabled = true;
    typingIndicator.style.display = 'flex';

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: chatHistory,
                model: currentModel,
                stream: true
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantMessage = '';
        let messageDiv = null;

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.content) {
                            if (!messageDiv) {
                                messageDiv = document.createElement('div');
                                messageDiv.className = 'message assistant';

                                // Gemini Icon
                                const iconDiv = document.createElement('div');
                                iconDiv.className = 'model-icon';
                                messageDiv.appendChild(iconDiv);

                                const contentDiv = document.createElement('div');
                                contentDiv.className = 'message-content markdown-body';
                                messageDiv.appendChild(contentDiv);

                                messagesContainer.appendChild(messageDiv);
                            }

                            assistantMessage += parsed.content;

                            // Live Markdown Rendering (expensive but cool)
                            const contentDiv = messageDiv.querySelector('.message-content');
                            contentDiv.innerHTML = marked.parse(assistantMessage);

                            // Highlight code blocks on the fly
                            contentDiv.querySelectorAll('pre code').forEach((block) => {
                                hljs.highlightElement(block);
                            });

                            messagesContainer.scrollTop = messagesContainer.scrollHeight;
                        }
                        if (parsed.error) {
                            throw new Error(parsed.error);
                        }
                    } catch (e) {
                        if (e.message !== 'Unexpected end of JSON input') {
                            console.error('Parse error:', e, 'data:', data);
                        }
                    }
                }
            }
        }

        if (assistantMessage) {
            chatHistory.push({ role: 'assistant', content: assistantMessage });
            saveCurrentSession(); // Save after full response
        }
    } catch (error) {
        console.error('Send error:', error);
        showSystemMessage(`Error: ${error.message}`);
    } finally {
        sendBtn.disabled = false;
        typingIndicator.style.display = 'none';
        messageInput.focus();
    }
}

// Event listeners for chat
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
        handleFileUpload(e.target.files);
        fileInput.value = '';
    }
});

modelSelect.addEventListener('change', () => {
    currentModel = modelSelect.value;
    const selectedOption = modelSelect.options[modelSelect.selectedIndex];
    const displayName = selectedOption.textContent;
    showSystemMessage(`Model changed to: ${displayName}`);
});

refreshModelsBtn.addEventListener('click', () => {
    loadModels().then(() => {
        showSystemMessage('Models refreshed');
    });
});

newChatBtn.addEventListener('click', createNewChat);

// Workflow functions
async function runWorkflow() {
    try {
        const definition = JSON.parse(workflowDefinition.value);

        const response = await fetch('/api/workflows', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(definition)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to start workflow');
        }

        const result = await response.json();
        showSystemMessage(`Workflow started: ${result.executionId}`);

        startPollingExecution(result.executionId);
        setTimeout(refreshExecutions, 1000);

        // Clear editor after successful start
        // workflowDefinition.value = '';
    } catch (error) {
        console.error('Workflow error:', error);
        alert(`Workflow error: ${error.message}`);
    }
}

async function refreshExecutions() {
    try {
        const response = await fetch('/api/workflows');
        if (!response.ok) throw new Error('Failed to fetch executions');

        const data = await response.json();
        renderExecutionsList(data.executions);
    } catch (error) {
        console.error('Refresh error:', error);
    }
}

function renderExecutionsList(executions) {
    if (executions.length === 0) {
        executionsList.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="6" height="6" stroke-linecap="round" stroke-linejoin="round"/>
                    <rect x="15" y="3" width="6" height="6" stroke-linecap="round" stroke-linejoin="round"/>
                    <rect x="9" y="15" width="6" height="6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>No executions yet</p>
                <small>Run a workflow to see results</small>
            </div>
        `;
        return;
    }

    executionsList.innerHTML = '';
    executions.forEach(exec => {
        const item = document.createElement('div');
        item.className = `execution-item ${selectedExecutionId === exec.id ? 'selected' : ''}`;
        item.innerHTML = `
            <div class="execution-item-header">
                <span class="execution-id">${exec.id}</span>
                <span class="execution-status ${exec.status}">${exec.status}</span>
            </div>
            <div class="execution-meta">
                <span>${exec.workflowId}</span>
                <span>${exec.stepCount} steps</span>
                <span>${new Date(exec.startedAt).toLocaleTimeString()}</span>
            </div>
        `;
        item.addEventListener('click', () => showExecutionDetail(exec.id));
        executionsList.appendChild(item);
    });
}

async function showExecutionDetail(executionId) {
    try {
        const response = await fetch(`/api/workflows/${executionId}`);
        if (!response.ok) throw new Error('Failed to fetch execution details');

        const execution = await response.json();
        selectedExecutionId = executionId;

        // Update selected state
        document.querySelectorAll('.execution-item').forEach(item => {
            item.classList.toggle('selected', item.textContent.includes(executionId));
        });

        renderExecutionDetail(execution);
        executionModal.classList.add('active');

        startPollingExecution(executionId);
    } catch (error) {
        console.error('Detail error:', error);
        alert(`Failed to load execution details: ${error.message}`);
    }
}

function renderExecutionDetail(execution) {
    modalBody.innerHTML = `
        <div class="detail-section">
            <h4>Overview</h4>
            <pre>${JSON.stringify({
        id: execution.id,
        workflowId: execution.workflowId,
        status: execution.status,
        startedAt: execution.startedAt,
        completedAt: execution.completedAt,
        error: execution.error
    }, null, 2)}</pre>
        </div>
        
        <div class="detail-section">
            <h4>Context</h4>
            <pre>${JSON.stringify(execution.context, null, 2)}</pre>
        </div>
        
        <div class="detail-section">
            <h4>Step Results (${execution.stepResults.length})</h4>
            <div class="step-results">
                ${execution.stepResults.map(result => `
                    <div class="step-result">
                        <div class="step-result-header">
                            <span class="step-id">${result.stepId}</span>
                            <span class="step-status ${result.status}">${result.status}</span>
                        </div>
                        <div class="step-duration">Duration: ${result.durationMs}ms</div>
                        ${result.output ? `<div class="step-output">${JSON.stringify(result.output, null, 2)}</div>` : ''}
                        ${result.error ? `<div class="step-error">Error: ${result.error}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
        
        ${execution.queuedSteps.length > 0 ? `
        <div class="detail-section">
            <h4>Queued Steps</h4>
            <pre>${JSON.stringify(execution.queuedSteps, null, 2)}</pre>
        </div>
        ` : ''}
        
        ${execution.completedSteps.size > 0 ? `
        <div class="detail-section">
            <h4>Completed Steps</h4>
            <pre>${JSON.stringify(Array.from(execution.completedSteps), null, 2)}</pre>
        </div>
        ` : ''}
    `;
}

function startPollingExecution(executionId) {
    stopPollingExecution(executionId);

    const interval = setInterval(async () => {
        try {
            const response = await fetch(`/api/workflows/${executionId}`);
            if (response.ok) {
                const execution = await response.json();
                renderExecutionDetail(execution);
                refreshExecutions();

                if (['completed', 'failed', 'stopped'].includes(execution.status)) {
                    stopPollingExecution(executionId);
                }
            } else {
                stopPollingExecution(executionId);
            }
        } catch (error) {
            console.error('Polling error:', error);
        }
    }, 2000);

    executionPollingIntervals.set(executionId, interval);
}

function stopPollingExecution(executionId) {
    const interval = executionPollingIntervals.get(executionId);
    if (interval) {
        clearInterval(interval);
        executionPollingIntervals.delete(executionId);
    }
}

function loadWorkflowFromFile() {
    workflowFileInput.click();
}

workflowFileInput.addEventListener('change', async (e) => {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        try {
            const content = await file.text();
            workflowDefinition.value = content;
            showSystemMessage(`Loaded: ${file.name}`);
        } catch (error) {
            alert(`Failed to load file: ${error.message}`);
        }
        workflowFileInput.value = '';
    }
});

function clearWorkflow() {
    if (confirm('Clear workflow definition?')) {
        workflowDefinition.value = '';
    }
}

// Event listeners for workflow
runWorkflowBtn.addEventListener('click', runWorkflow);
loadWorkflowBtn.addEventListener('click', loadWorkflowFromFile);
clearWorkflowBtn.addEventListener('click', clearWorkflow);
refreshExecutionsBtn.addEventListener('click', refreshExecutions);

closeModalBtn.addEventListener('click', () => {
    executionModal.classList.remove('active');
    selectedExecutionId = null;
    stopPollingExecution(selectedExecutionId);
});

executionModal.querySelector('.modal-overlay').addEventListener('click', () => {
    executionModal.classList.remove('active');
    selectedExecutionId = null;
    stopPollingExecution(selectedExecutionId);
});

// Mobile menu toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Close sidebar on history item click (mobile)
historyList.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && e.target.closest('.history-item')) {
        sidebar.classList.remove('active');
    }
});

// Initialize
async function init() {
    await loadConfig();
    await loadModels();
    await loadSessions();
    showSystemMessage('Ready to chat!');
    messageInput.focus();
}

init();
