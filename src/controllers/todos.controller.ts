import Todo from '../models/Todo.model';

class TodoController {
    async getAllTodos() {
        return Todo.find({});
    }

    async createTodo(todoData: { title: string }) {
        const newTodo = new Todo(todoData);
        return newTodo.save();
    }

    async updateTodo(
        todoId: string,
        todoData: { title: string; completed: boolean }
    ) {
        const { title, completed } = todoData;
        const todo = await Todo.findById(todoId);
        todo.completed = completed;
        todo.title = title;
        await todo.save();
        return todo;
    }

    async deleteTodo(todoId: string) {
        const result = await Todo.findByIdAndDelete(todoId);
        return result;
    }
}

export default TodoController;
