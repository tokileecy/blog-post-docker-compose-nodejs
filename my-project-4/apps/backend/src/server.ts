import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const corsOrigin =
  process.env.ALLOW_CORS_ORIGIN !== undefined
    ? process.env.ALLOW_CORS_ORIGIN.replace(/ /g, '').split(',')
    : '';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(
  cors({
    origin: corsOrigin,
    optionsSuccessStatus: 200,
  }),
);

const todoRouter = express.Router();

app.use('/todos', todoRouter);

todoRouter.get('/', async (_req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        created: 'desc',
      },
      select: {
        id: true,
        name: true,
        completed: true,
      },
    });
    res.json(todos);
  } catch {
    res.status(500).send('Internal Server Error');
  }
});

todoRouter.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    await prisma.todo.create({
      data: {
        name,
      },
    });
    res.status(200).send('Created');
  } catch {
    res.status(500).send('Internal Server Error');
  }
});

todoRouter.post('/:id/complete', async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed: true },
    });
    res.json(todo);
  } catch {
    res.status(500).send('Internal Server Error');
  }
});

todoRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const todo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.json(todo);
  } catch {
    res.status(500).send('Internal Server Error');
  }
});

todoRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.delete({
      where: { id: Number(id) },
    });
    res.json(todo);
  } catch {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(8081, () => {
  console.log(`Server running on port 8081`);
});
