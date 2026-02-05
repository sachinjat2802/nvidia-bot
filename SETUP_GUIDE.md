# Complete Setup & Testing Guide

## Quick Setup (3 Steps)

### 1. Fix PowerShell Execution Policy (Windows)

Open PowerShell as **Administrator** and run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Or use Command Prompt instead:
```cmd
cd c:\Users\Administrator\Desktop\nvidia-bot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
# Copy example env file
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NVIDIA_API_KEY=nvapi-your-key-here
```

### 4. Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the migration file: `supabase/migrations/001_initial_workflow_schema.sql`
4. Enable **Row Level Security** on all tables (the migration does this automatically)

### 5. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

---

## Testing the Workflow System

### Manual Testing Steps

1. **Create a Simple Workflow**
   - Click "Create Workflow"
   - Add an LLM node
   - Configure it with a model and message
   - Click "Save"
   - Click "Execute"
   - Verify execution completes successfully

2. **Test Webhook Trigger**
   ```bash
   # Create a workflow first, then create a trigger
   curl -X POST http://localhost:3000/api/triggers \
     -H "Content-Type: application/json" \
     -d '{"workflowId": "YOUR_WORKFLOW_ID", "type": "webhook"}'
   
   # Get the trigger URL from response and test
   curl -X POST http://localhost:3000/api/webhooks/TRIGGER_ID \
     -H "Content-Type: application/json" \
     -d '{"test": "data"}'
   ```

3. **Test Database Integration** (if you have a database)
   - Create an integration in `/api/integrations`
   - Use it in a Database node
   - Execute workflow

### Automated Test Script

Create `test-workflow-automated.js`:

```javascript
// Test workflow automation system
const { createClient } = require('@supabase/supabase-js');

// Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function runTests() {
    console.log('🧪 Starting Workflow System Tests...\n');
    
    try {
        // Test 1: Create a simple workflow
        console.log('Test 1: Creating workflow...');
        const workflow = {
            name: 'Test Workflow',
            description: 'Automated test workflow',
            version: '1.0.0',
            steps: [
                {
                    id: 'step1',
                    type: 'llm',
                    name: 'Test LLM',
                    llmConfig: {
                        model: 'meta/llama-3.1-8b-instruct',
                        content: 'Hello, this is a test!',
                        temperature: 0.7,
                        maxTokens: 50
                    },
                    outputMapping: {
                        response: 'output'
                    }
                }
            ],
            globalContext: {},
            retryPolicy: { maxRetries: 3, backoffMs: 1000 },
            timeoutMs: 300000,
            concurrency: 1,
            tags: ['test']
        };
        
        const { data: savedWorkflow, error: saveError } = await supabase
            .from('workflows')
            .insert({
                user_id: 'test-user-id', // Replace with actual user ID
                name: workflow.name,
                description: workflow.description,
                definition: workflow,
                version: workflow.version,
                tags: workflow.tags,
                is_active: true
            })
            .select()
            .single();
            
        if (saveError) throw saveError;
        console.log('✅ Workflow created:', savedWorkflow.id);
        
        // Test 2: Execute workflow
        console.log('\nTest 2: Executing workflow...');
        const response = await fetch(`/api/workflows/${savedWorkflow.id}/execute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inputContext: {} })
        });
        
        if (!response.ok) {
            throw new Error(`Execution failed: ${response.statusText}`);
        }
        
        const { execution } = await response.json();
        console.log('✅ Workflow executed:', execution.id);
        
        // Test 3: Check execution status
        console.log('\nTest 3: Checking execution status...');
        const { data: execData } = await supabase
            .from('executions')
            .select('*')
            .eq('id', execution.id)
            .single();
            
        if (!execData) throw new Error('Execution not found');
        console.log('✅ Execution status:', execData.status);
        
        // Test 4: Create trigger
        console.log('\nTest 4: Creating webhook trigger...');
        const { data: trigger, error: triggerError } = await supabase
            .from('triggers')
            .insert({
                user_id: 'test-user-id',
                workflow_id: savedWorkflow.id,
                type: 'webhook',
                config: {},
                is_active: true
            })
            .select()
            .single();
            
        if (triggerError) throw triggerError;
        console.log('✅ Trigger created:', trigger.id);
        console.log('🔗 Webhook URL:', `http://localhost:3000/api/webhooks/${trigger.id}`);
        
        console.log('\n🎉 All tests passed!');
        console.log('\nNext steps:');
        console.log('1. Open http://localhost:3000');
        console.log('2. View your workflow in the editor');
        console.log('3. Test the webhook: curl -X POST http://localhost:3000/api/webhooks/' + trigger.id + ' -H "Content-Type: application/json" -d \'{"test": "data"}\'');
        
    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        process.exit(1);
    }
}

runTests();
```

---

## Example Workflows

### Example 1: AI-Powered Email Processor

```json
{
  "name": "AI Email Processor",
  "description": "Process incoming emails with AI and send responses",
  "version": "1.0.0",
  "steps": [
    {
      "id": "webhook_trigger",
      "type": "webhook",
      "name": "Email Webhook",
      "webhookConfig": {
        "url": "https://api.example.com/emails",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        }
      },
      "outputMapping": {
        "emailData": "data"
      }
    },
    {
      "id": "extract_content",
      "type": "transform",
      "name": "Extract Email Content",
      "dependsOn": ["webhook_trigger"],
      "transformConfig": {
        "mapping": [
          {
            "source": "emailData.body",
            "target": "emailBody"
          },
          {
            "source": "emailData.from",
            "target": "senderEmail"
          }
        ]
      }
    },
    {
      "id": "ai_analysis",
      "type": "llm",
      "name": "AI Analysis",
      "dependsOn": ["extract_content"],
      "llmConfig": {
        "model": "meta/llama-3.1-70b-instruct",
        "systemPrompt": "You are an email assistant. Analyze the email and provide a professional response.",
        "content": "Email from ${senderEmail}: ${emailBody}\n\nProvide a response:",
        "temperature": 0.7,
        "maxTokens": 500
      },
      "outputMapping": {
        "response": "aiResponse"
      }
    },
    {
      "id": "send_response",
      "type": "email",
      "name": "Send Response",
      "dependsOn": ["ai_analysis"],
      "emailConfig": {
        "useIntegration": true,
        "integrationId": "YOUR_SMTP_INTEGRATION_ID",
        "to": "${senderEmail}",
        "subject": "Re: Your Email",
        "body": "${aiResponse}",
        "isHtml": false
      }
    }
  ],
  "globalContext": {},
  "retryPolicy": {
    "maxRetries": 3,
    "backoffMs": 1000
  },
  "timeoutMs": 300000,
  "concurrency": 1,
  "tags": ["email", "ai", "automation"]
}
```

### Example 2: Data Pipeline with Database Sync

```json
{
  "name": "API to Database Sync",
  "description": "Fetch data from API and store in database",
  "version": "1.0.0",
  "steps": [
    {
      "id": "fetch_api",
      "type": "http",
      "name": "Fetch External API",
      "httpConfig": {
        "url": "https://api.example.com/data",
        "method": "GET",
        "responseType": "json"
      },
      "outputMapping": {
        "apiData": "data"
      }
    },
    {
      "id": "transform_data",
      "type": "transform",
      "name": "Transform Data",
      "dependsOn": ["fetch_api"],
      "transformConfig": {
        "mapping": [
          {
            "source": "apiData.items",
            "target": "records"
          }
        ],
        "filter": "item.active === true",
        "sortBy": "item.createdAt",
        "sortOrder": "desc"
      }
    },
    {
      "id": "db_insert",
      "type": "database",
      "name": "Insert to Database",
      "dependsOn": ["transform_data"],
      "databaseConfig": {
        "useIntegration": true,
        "integrationId": "YOUR_DB_INTEGRATION_ID",
        "operation": "insert",
        "query": "INSERT INTO items (name, value, created_at) VALUES ($1, $2, $3) RETURNING *",
        "data": {
          "name": "${records.name}",
          "value": "${records.value}",
          "created_at": "${records.createdAt}"
        }
      }
    }
  ],
  "globalContext": {},
  "retryPolicy": {
    "maxRetries": 3,
    "backoffMs": 1000
  },
  "timeoutMs": 300000,
  "concurrency": 1,
  "tags": ["database", "api", "etl"]
}
```

---

## API Testing with cURL

### 1. List Workflows
```bash
curl http://localhost:3000/api/workflows
```

### 2. Create Workflow
```bash
curl -X POST http://localhost:3000/api/workflows \
  -H "Content-Type: application/json" \
  -d '{"workflow": {"name": "Test", "version": "1.0.0", "steps": [], "globalContext": {}, "retryPolicy": {"maxRetries": 3, "backoffMs": 1000}, "timeoutMs": 300000, "concurrency": 1, "tags": []}}'
```

### 3. Execute Workflow
```bash
curl -X POST http://localhost:3000/api/workflows/WORKFLOW_ID/execute \
  -H "Content-Type: application/json" \
  -d '{"inputContext": {"test": "data"}}'
```

### 4. Create Integration
```bash
curl -X POST http://localhost:3000/api/integrations \
  -H "Content-Type: application/json" \
  -d '{
    "type": "postgres",
    "name": "My Database",
    "config": {
      "host": "localhost",
      "port": 5432,
      "database": "mydb",
      "username": "user",
      "password": "pass"
    }
  }'
```

### 5. Create Trigger
```bash
curl -X POST http://localhost:3000/api/triggers \
  -H "Content-Type: application/json" \
  -d '{
    "workflowId": "WORKFLOW_ID",
    "type": "webhook",
    "config": {}
  }'
```

---

## Troubleshooting

### PowerShell Execution Policy
If you see "running scripts is disabled" error:
1. Open PowerShell as Administrator
2. Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Or use Command Prompt instead

### Supabase Connection Issues
- Verify SUPABASE_URL and SUPABASE_ANON_KEY in .env
- Check that migration ran successfully
- Ensure Row Level Security policies are enabled

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### TypeScript Errors
All TypeScript files are fully typed. If you see type errors:
1. Check that all imports are correct
2. Verify @types packages are installed
3. Run `npx tsc --noEmit` to check types

---

## Production Deployment

### Environment Variables for Production
```env
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=your-production-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # For admin operations
NVIDIA_API_KEY=your-nvidia-key
```

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

---

## What's Implemented

✅ Complete workflow engine with 11 node types
✅ Supabase integration with RLS
✅ Visual editor with React Flow
✅ Webhook triggers
✅ Integration management
✅ Execution tracking
✅ Template variables
✅ Dependency resolution
✅ Error handling
✅ Full TypeScript support

---

## Next Steps

1. Set up Supabase project
2. Run migration
3. Configure .env
4. Start dev server
5. Create your first workflow!
6. Test with webhook triggers
7. Add integrations (DB, Email, Storage)
8. Deploy to production

---

## Support

For issues or questions, check:
- README.md for full documentation
- supabase/migrations/ for database schema
- src/workflow.ts for type definitions
- src/workflow-engine.ts for execution logic