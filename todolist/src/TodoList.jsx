import { useState } from "react";
import TodoTable from "./TodoTable";

function TodoList() {

    const [formData, setFormData] = useState({
        desc: "",
        date: ""
    });
    const [todos, setTodos] = useState([]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const addTodo = (event) => {
        event.preventDefault();
        setTodos([...todos, formData]);
        setFormData({
            desc: "",
            date: ""
        });
    };

    const deleteTodo = (itemToDelete) => {
        setTodos(todos.filter((todo, i) => i !== itemToDelete));
    };

    return (
        <>
            <h1>Simple Todolist</h1>
            <form>
                <label for="desc">Description:</label>
                <input type="text" id="desc" name="desc" placeholder="Description" onChange={handleChange} value={formData.desc} />
                <label for="text">Date:</label>
                <input type="text" id="date" name="date" placeholder="Date" onChange={handleChange} value={formData.date} />
                <button onClick={addTodo}>Add</button>
            </form>
            <TodoTable todos={todos} deleteTodo={deleteTodo}/>
        </>
    );s
}

export default TodoList;