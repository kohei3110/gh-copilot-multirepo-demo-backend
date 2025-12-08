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
3. Press `Enter` and watch Copilot suggest code
4. Press `Tab` to accept suggestions

### Step 4.3: Using Web Search for Copilot

When you need up-to-date information:

1. Open Copilot Chat
2. Ask: `@websearch What are the latest best practices for implementing Web Push API in Node.js?`
3. Copilot will search the web and provide current information

## 🔔 Part 5: Implementing Web Push Notifications

### Step 5.1: Understanding Web Push

Web Push allows servers to send notifications to users even when they're not actively using your app.

### Step 5.2: Review the Push Notification Service

Open `src/services/pushNotificationService.ts` and review:
- VAPID key generation
- Subscription management
- Notification sending

### Step 5.3: Test Push Notifications

```bash
# Generate VAPID keys (already done, but you can regenerate)
curl -X POST http://localhost:3000/api/push/vapid-public-key

# Save a subscription (example)
curl -X POST http://localhost:3000/api/push/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "endpoint": "https://fcm.googleapis.com/fcm/send/...",
    "keys": {
      "p256dh": "BKXk...",
      "auth": "abc123..."
    }
  }'

# Send a test notification
curl -X POST http://localhost:3000/api/push/send \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Notification",
    "body": "This is a test",
    "data": {"url": "/"}
  }'
```

## 🧪 Part 6: Testing Your Code

### Step 6.1: Run Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# View coverage report
open coverage/lcov-report/index.html  # macOS
```

### Step 6.2: Review Test Coverage

Open the coverage report and check:
- Line coverage: Should be >80%
- Branch coverage: Should be >70%
- Function coverage: Should be >90%

### Step 6.3: Write a New Test

Open `src/services/__tests__/todoService.test.ts` and add:

```typescript
describe('TodoService - Edge Cases', () => {
  test('should handle very long todo titles', () => {
    const longTitle = 'a'.repeat(1000);
    const todo = todoService.createTodo(longTitle, 'Description');
    expect(todo.title).toBe(longTitle);
  });
});
```

Run the test:
```bash
npm test -- todoService.test.ts
```

## 🚀 Part 7: Using Copilot Orchestra Workflow

### Step 7.1: Create a New Feature Request

Let's say you want to add a "priority" field to todos. Use Copilot Chat:

```
@workspace I want to add a priority field to TODO items (low, medium, high). 
Create an implementation plan.
```

### Step 7.2: Review the Plan

Copilot will suggest:
1. Update TypeScript types
2. Modify the service layer
3. Update API endpoints
4. Add validation
5. Write tests
6. Update documentation

### Step 7.3: Implement with Guidance

Ask Copilot to implement each step:

```
Implement step 1: Update TypeScript types for priority field
```

Review the suggestion, then accept or modify as needed.

### Step 7.4: Commit Your Changes

```bash
# Stage changes
git add .

# Commit with a descriptive message
git commit -m "feat: add priority field to TODO items"

# Push to your branch
git push origin feature/add-priority
```

### Step 7.5: Create a Pull Request

```bash
# Using GitHub CLI
gh pr create --title "Add priority field to TODOs" \
  --body "Implements priority levels (low, medium, high) for TODO items"
```

## 🎓 Part 8: Advanced Topics

### Step 8.1: Using Context-Aware Prompts

Instead of generic prompts, provide context:

**Generic:**
```
How do I add authentication?
```

**Context-Aware:**
```
@workspace Looking at the current Express app structure, how should I add 
JWT-based authentication that integrates with the existing middleware?
```

### Step 8.2: Iterative Refinement

Don't accept the first suggestion blindly:

1. Ask for the implementation
2. Review and identify issues
3. Ask for improvements: "Can you optimize this for better error handling?"
4. Repeat until satisfied

### Step 8.3: Exploring Agent Files

Check if your project has agent definitions:

```bash
ls -la .github/copilot-agents/
```

Review these files to understand how agents are configured.

## 📝 Part 9: Best Practices

### 9.1 Code Quality

- ✅ Use TypeScript for type safety
- ✅ Write tests for all business logic
- ✅ Follow consistent naming conventions
- ✅ Add comments for complex logic
- ✅ Use ESLint and Prettier

### 9.2 Copilot Usage

- ✅ Provide clear, specific prompts
- ✅ Review all suggestions before accepting
- ✅ Use `@workspace` for context-aware help
- ✅ Leverage Web Search for current information
- ✅ Break complex tasks into smaller steps

### 9.3 Security

- ✅ Never commit secrets or API keys
- ✅ Validate all user inputs
- ✅ Use environment variables for configuration
- ✅ Keep dependencies updated

## 🎯 Practice Exercises

### Exercise 1: Add a "Due Date" Feature
Add due date functionality to TODO items with validation.

### Exercise 2: Implement Filtering
Add query parameters to filter todos by status or priority.

### Exercise 3: Add Pagination
Implement pagination for the todo list endpoint.

### Exercise 4: Create a Search Endpoint
Add full-text search capability for todo titles and descriptions.

## 🐛 Troubleshooting

### Container Won't Build
- Check Docker is running
- Try rebuilding: `Dev Containers: Rebuild Container`

### Copilot Not Working
- Verify your subscription is active
- Check extension is enabled
- Try reloading VS Code

### Tests Failing
- Ensure all dependencies are installed: `npm install`
- Check for syntax errors
- Review test output carefully

## 📚 Additional Resources

- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)

## ✅ Completion Checklist

- [ ] Set up dev container environment
- [ ] Ran the development server successfully
- [ ] Tested all TODO API endpoints
- [ ] Used Copilot Chat for assistance
- [ ] Implemented a new feature with Copilot
- [ ] Wrote and ran tests
- [ ] Created a pull request
- [ ] Completed at least one practice exercise

## 🎉 Next Steps

Congratulations on completing this hands-on tutorial! You now understand:
- How to use Copilot Orchestra workflows
- Building APIs with TypeScript and Express
- Implementing Web Push Notifications
- Writing tests and maintaining code quality

Consider exploring:
- The frontend repository to build a complete full-stack app
- More advanced Copilot features
- Custom agent configurations
- CI/CD integration with GitHub Actions

---

**Questions or Feedback?** Open an issue in this repository or reach out to the maintainers.

Happy coding with Copilot Orchestra! 🚀
