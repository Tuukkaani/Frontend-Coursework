import { useState } from 'react';
import TodoTable from './TodoTable';

function TodoList() {
    const [todo, setTodo] = useState({
        description: "",
        date: "",
    });

    const [todos, setTodos] = useState([]);

    const handleInput = (event) => {
        setTodo({ ...todo, [event.target.name]: event.target.value });
    };

    const addTodo = () => {
        if (!todo.description || !todo.date) {
            alert("All fields are required!");
            return;
        }

        setTodos([...todos, todo]);
        setTodo({
            date: "",
            description: "",
        });
    };

    const deleteTodo = (todoToDelete) => {
        const updatedTodos = todos.filter((todo) => todo !== todoToDelete);
        setTodos(updatedTodos);
    };

    return (
        <>
            <input
                type="text"
                name="description"
                onChange={handleInput}
                value={todo.description}
                placeholder="Buy coffee"
            />
            <input
                type="text"
                name="date"
                onChange={handleInput}
                value={todo.date}
                placeholder="25.05.2025"
            />
            <button onClick={addTodo}>Add</button>
            <TodoTable todos={todos} deleteTodo={deleteTodo} />
        </>
    );
};

export default TodoList;
