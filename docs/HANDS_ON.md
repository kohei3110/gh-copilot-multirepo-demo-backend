# Hands-On Tutorial: Building a TODO App Backend with Copilot Orchestra

This hands-on guide walks you through building a TODO application backend using GitHub Copilot Orchestra. You'll learn how to leverage multiple AI agents to streamline your development workflow.

## 🎯 Learning Objectives

By completing this tutorial, you will:
- Set up a dev container environment with necessary tools
- Understand the Copilot Orchestra workflow
- Build a REST API with TypeScript and Express
- Implement CRUD operations for TODO items
- Add Web Push Notification support
- Write tests and ensure code quality
- Create pull requests using AI-assisted workflows

## 📚 Prerequisites

Before starting, ensure you have:
- Basic knowledge of TypeScript/JavaScript
- Basic understanding of REST APIs
- Docker Desktop installed
- VS Code with Dev Containers extension
- GitHub Copilot subscription
- GitHub account

## 🏁 Part 1: Environment Setup

### Step 1.1: Open the Project in Dev Container

1. Open this project in VS Code
2. When prompted "Reopen in Container", click **Reopen in Container**
   - Or press `F1` and select `Dev Containers: Reopen in Container`
3. Wait for the container to build (first time takes ~2-3 minutes)
4. Once complete, you'll have a fully configured environment with:
   - Node.js 20
   - Git CLI
   - GitHub CLI (gh)
   - GitHub Copilot
   - Web Search for Copilot extension

### Step 1.2: Verify Your Environment

Open the integrated terminal and run:

```bash
# Check Node.js version
node --version  # Should show v20.x.x

# Check Git
git --version

# Check GitHub CLI
gh --version

# Check npm packages are installed
npm list
```

### Step 1.3: Authenticate GitHub CLI

```bash
gh auth login
```

Follow the prompts to authenticate with your GitHub account.

## 🤖 Part 2: Understanding Copilot Orchestra

Copilot Orchestra coordinates multiple specialized AI agents:

```
User Request
    ↓
[Orchestrator Agent] ← You are here
    ↓
    ├─→ [Issue Agent] ────→ Creates GitHub Issue
    ↓
    ├─→ [Plan Agent] ─────→ Designs Implementation Plan
    ↓
    ├─→ [Impl Agent] ─────→ Writes Code
    ↓
    ├─→ [Review Agent] ───→ Reviews & Improves Code
    ↓
    └─→ [PR Agent] ───────→ Creates Pull Request
```

### Key Concepts

1. **Orchestrator Agent**: Manages the overall workflow
2. **Issue Agent**: Understands requirements and creates detailed issues
3. **Plan Agent**: Breaks down tasks into actionable steps
4. **Implementation Agent**: Writes code following the plan
5. **Review Agent**: Ensures code quality and best practices
6. **PR Agent**: Creates comprehensive pull requests

## 🔨 Part 3: Building the TODO API

### Step 3.1: Explore the Existing Code Structure

Let's first understand what we have:

```bash
# View the current structure
tree -L 2 src/
```

You'll see:
- `server.ts` - Entry point
- `config/` - Configuration management
- `services/` - Business logic
- `types/` - TypeScript definitions
- `utils/` - Helper functions

### Step 3.2: Start the Development Server

```bash
npm run dev
```

The server should start on `http://localhost:3000`. You'll see logs in the terminal.

### Step 3.3: Test the Current API

Open a new terminal and test existing endpoints:

```bash
# Health check
curl http://localhost:3000/health

# List todos (should be empty initially)
curl http://localhost:3000/api/todos
```

### Step 3.4: Understanding TODO Operations

The API supports these operations:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | List all todos |
| GET | `/api/todos/:id` | Get a specific todo |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |

## 🧪 Part 4: Working with Copilot

### Step 4.1: Using Copilot Chat

1. Open Copilot Chat (`Ctrl+Cmd+I` on Mac, `Ctrl+Shift+I` on Windows/Linux)
2. Try asking:
   ```
   @workspace How do I add a new endpoint to this API?
   ```

3. Copilot will analyze your workspace and provide context-aware suggestions

### Step 4.2: Inline Suggestions

1. Open `src/server.ts`
2. Start typing a comment: `// Add endpoint for marking todo as complete`
3. Press `Delegate to agent` and watch Copilot suggest code

### Step 4.3: Delegate Tasks to the Orchestrator Agent

1. Open Copilot Chat and select `orchestrator`

![orchestrator](../assets/orchestrator.png)

2. Enter: `I want to implement a feature that sends Web Push notifications one day before the deadline`

3. Verify that Todos are created like the following:

- Create a GitHub issue with the issue agent
- Create an implementation plan with the plan agent
- Implement with the impl agent
- Perform code review with the review agent

![todos](../assets/todos.png)

**Please note that the wording may vary. It's OK if you can confirm that the orchestrator agent is distributing tasks to each agent.**

## 🎯 Practice Exercises

### Exercise 1: Add a "Due Date" Feature
Add due date functionality to TODO items with validation.

### Exercise 2: Implement Filtering
Add query parameters to filter todos by status or priority.

### Exercise 3: Add Pagination
Implement pagination for the todo list endpoint.

### Exercise 4: Create a Search Endpoint
Add full-text search capability for todo titles and descriptions.

## 🐛 Part 5: Fixing Bugs with GitHub Copilot Coding Agent

In this section, you'll learn how to use GitHub Copilot Coding Agent to fix intentionally added bugs.

### Step 5.1: Verify the Bugs

The project contains two intentional bugs:

1. **Bug 1: DELETE endpoint** - Doesn't return 404 error when deleting non-existent ID
2. **Bug 2: PUT endpoint** - Allows updating TODOs with empty strings

First, start the server and verify the bugs:

```bash
# Start the server
npm run dev
```

Open a new terminal and test the bugs:

```bash
# Test Bug 1: Delete non-existent ID
curl -X DELETE http://localhost:3000/todos/nonexistent-id -v

# Expected: 404 Not Found
# Actual: 204 No Content (Bug!)
```

```bash
# Test Bug 2:
# 1. Create a TODO
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Test Todo"}'

# Note the ID from response (e.g., "1733123456789")

# 2. Update with empty string
curl -X PUT http://localhost:3000/todos/[ID-from-above] \
  -H "Content-Type: application/json" \
  -d '{"text":""}'

# Expected: 400 Bad Request
# Actual: 200 OK (Bug!)
```

### Step 5.2: Ask Copilot Coding Agent to Fix the Bugs

1. Create an issue on GitHub. Navigate to the Issues tab in your repository, click "New issue", and select the "Bug Report (Copilot Agent Optimized)" template.

2. Fill out the issue following the ISSUE_TEMPLATE with the following content:

**Title:**
```
[Bug] Validation Issues in DELETE and PUT Endpoints
```

**Bug Summary:**
```
There are two bugs in `src/server.ts`:

1. **DELETE /todos/:id endpoint** - Returns 204 instead of 404 for non-existent IDs
2. **PUT /todos/:id endpoint** - Allows empty strings for text
```

**Steps to Reproduce:**
```
### Bug 1: DELETE endpoint
# Start the server
npm run dev

# Execute in a new terminal
curl -X DELETE http://localhost:3000/todos/nonexistent-id -v

### Bug 2: PUT endpoint
# 1. Create a TODO
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Test Todo"}'

# 2. Note the ID from response and update with empty string
curl -X PUT http://localhost:3000/todos/[ID] \
  -H "Content-Type: application/json" \
  -d '{"text":""}'
```

**Expected Behavior:**
```
### Bug 1
- When attempting to delete non-existent ID: Should return 404 Not Found with error message {"error": "Todo not found"}

### Bug 2
- When attempting to update with empty or whitespace-only text: Should return 400 Bad Request with error message {"error": "Text cannot be empty"}
```

**Actual Behavior:**
```
### Bug 1
- Deleting non-existent ID: Returns 204 No Content (Bug!)

### Bug 2
- Updating with empty string: Returns 200 OK (Bug!)
```

**Suspected Files:**
```
- src/server.ts - Implementation of DELETE and PUT endpoints
```

**Constraints:**
```
- Maintain existing API response format
- Do not affect the behavior of other endpoints (GET, POST)
```

**Acceptance Criteria:**
```
- [ ] DELETE /todos/:id returns 404 error for non-existent IDs
- [ ] DELETE /todos/:id returns appropriate error message {"error": "Todo not found"}
- [ ] PUT /todos/:id returns 400 error for empty text
- [ ] PUT /todos/:id returns 400 error for whitespace-only text
- [ ] PUT /todos/:id returns appropriate error message {"error": "Text cannot be empty"}
- [ ] After fixes, bugs no longer occur when following reproduction steps
- [ ] Existing positive test cases continue to pass
```

3. Add labels `bug`.

4. After creating the issue, assign the Copilot Coding Agent to the issue.

5. Review and apply the fixes when Copilot suggests solutions.

### Step 5.3: Verify the Fixes

After applying the fixes, test again to verify correct behavior:

```bash
# Verify Bug 1 fix: Delete non-existent ID
curl -X DELETE http://localhost:3000/todos/nonexistent-id -v
# Expected: 404 Not Found with {"error": "Todo not found"}

# Verify Bug 2 fix: Update with empty string
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Test Todo"}'

curl -X PUT http://localhost:3000/todos/[ID] \
  -H "Content-Type: application/json" \
  -d '{"text":""}'
# Expected: 400 Bad Request with {"error": "Text cannot be empty"}
```

### Step 5.4: Key Learnings

From this exercise, you learn:

- **Clear Communication**: Explicitly describing bugs and expected behavior helps Copilot provide accurate fixes
- **Context Matters**: Specifying file names and endpoint names helps Copilot locate the right code
- **Verification is Critical**: Always test after fixes to ensure intended behavior

### Step 5.5: Further Improvements

You can ask Copilot for additional improvements:

```
Add unit tests for the bug fixes
```

```
Make error messages more detailed and user-friendly
```

## 🐛 Troubleshooting

### Container Won't Build
- Check Docker is running
- Try rebuilding: `Dev Containers: Rebuild Container`

### Copilot Not Working
- Verify your subscription is active
- Check extension is enabled
- Try reloading VS Code

### Bug Fixes Not Working as Expected
- Restart the server: `npm run dev`
- Review Copilot's suggestions and provide additional context if needed

## 📚 Additional Resources

- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [GitHub Copilot Coding Agent](https://docs.github.com/copilot/using-github-copilot/using-copilot-coding-agent-to-work-on-tasks)
- [copilot-orchestra](https://github.com/ShepAlderson/copilot-orchestra)

