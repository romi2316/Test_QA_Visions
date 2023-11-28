import express, { Router, Request, Response, NextFunction } from 'express';
import TodoController from '../controllers/todos.controller';

const router: Router = express.Router();
const todoController = new TodoController();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await todoController.getAllTodos();
        res.json(todos);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title } = req.body;
        const newTodo = await todoController.createTodo({ title });
        res.status(201).json(newTodo);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const todo = await todoController.updateTodo(id, {
            title,
            completed,
        });
        res.json(todo);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const deleted = await todoController.deleteTodo(id);
            res.json(deleted);
        } catch (err) {
            next(err);
        }
    }
);

export default router;
