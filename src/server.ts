import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

let todos: Todo[] = [];

// GET /health
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET /todos
app.get('/todos', (req: Request, res: Response) => {
  res.json(todos);
});

// POST /todos
app.post('/todos', (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ error: 'Text is required' });
    return;
  }
  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id
app.put('/todos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex === -1) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }

  // Validate text if provided
  if (text !== undefined && text.trim() === '') {
    res.status(400).json({ error: 'Text cannot be empty' });
    return;
  }

  const todo = todos[todoIndex];
  if (text !== undefined) todo.text = text;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// DELETE /todos/:id
app.delete('/todos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((t) => t.id === id);
  
  if (todoIndex === -1) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  
  todos.splice(todoIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
