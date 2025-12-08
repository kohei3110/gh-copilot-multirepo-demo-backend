# TODO App Backend - Copilot Orchestra Demo

A practical example of using **GitHub Copilot Orchestra** to build a backend for a TODO application. This project demonstrates how to leverage AI-powered development workflows with multiple specialized agents working together.

日本語版の README は[こちら](./README-ja.md)。

## Overview

This repository contains the backend implementation for a TODO application, built using:
- **Node.js** with **TypeScript**
- **Express.js** for REST API
- **GitHub Copilot Orchestra** for AI-assisted development

The project showcases how to use Copilot Orchestra to orchestrate multiple AI agents (issue, plan, implementation, review, and PR agents) to streamline the development process.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed
- [Visual Studio Code](https://code.visualstudio.com/) with [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- GitHub account

### Quick Start with Dev Container

1. **Clone the repository**
   ```bash
   git clone https://github.com/kohei3110/gh-copilot-multirepo-demo-backend.git
   cd gh-copilot-multirepo-demo-backend
   ```

2. **Open in Dev Container**
   - Open VS Code
   - Press `F1` or `Cmd+Shift+P` (Mac) / `Ctrl+Shift+P` (Windows/Linux)
   - Select: `Dev Containers: Reopen in Container`

3. **Start the development server**
   ```bash
   npm run dev
   ```

The dev container includes:
- Git CLI
- GitHub CLI (gh)
- GitHub Copilot
- Web Search for Copilot extension
- ESLint & Prettier

## Features

- RESTful API for TODO management (CRUD operations)
- TypeScript for type safety
- Express.js framework
- Web Push Notifications support
- Comprehensive test coverage
- Pre-configured dev container environment

## Documentation

For detailed hands-on tutorials, see:
- [English Hands-on Guide](./docs/HANDS_ON.md)
- [日本語ハンズオンガイド](./docs/HANDS_ON-ja.md)

## Project Structure

```
├── .devcontainer/          # Dev container configuration
├── src/
│   ├── server.ts          # Application entry point
│   ├── config/            # Configuration files
│   ├── services/          # Business logic
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── docs/                  # Documentation
└── coverage/              # Test coverage reports
```

## About Copilot Orchestra

Copilot Orchestra is an advanced workflow that coordinates multiple AI agents:

1. **Issue Agent**: Analyzes requirements and creates detailed issues
2. **Plan Agent**: Creates implementation plans
3. **Implementation Agent**: Writes code based on the plan
4. **Review Agent**: Reviews and improves code quality
5. **PR Agent**: Creates pull requests with comprehensive descriptions

This orchestrated approach ensures high-quality, well-documented code with minimal manual intervention.

---

**Note**: This is a demonstration project for educational purposes, showcasing best practices in AI-assisted development with GitHub Copilot Orchestra.
