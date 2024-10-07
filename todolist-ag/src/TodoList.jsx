import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function TodoList() {
    const [todo, setTodo] = useState({
        description: "",
        date: "",
        priority: ""
    });

    const [todos, setTodos] = useState([]);

    const columnDefs = [
        { field: "description",filter: "agTextColumnFilter", floatingFilter: true },
        { field: "date", filter: "agTextColumnFilter", floatingFilter: true },
        { field: "priority", filter: "agTextColumnFilter", floatingFilter: true }
    ];

    const handleInput = (event) => {
        setTodo({ ...todo, [event.target.name]: event.target.value });
    };

    const addTodo = () => {
        if (!todo.description || !todo.date || !todo.priority) {
            alert("All fields are required!");
            return;
        }

        setTodos([...todos, todo]);
        setTodo({
            date: "",
            description: "",
            priority: ""
        });
    };

    return (
        <>
            <div>
                <input 
                    type="text" 
                    onChange={handleInput} 
                    placeholder="Description" 
                    name="description" 
                    value={todo.description} 
                />
                <input 
                    type="text" 
                    onChange={handleInput} 
                    placeholder="Date" 
                    name="date" 
                    value={todo.date} 
                />

                <input 
                    type="text" 
                    onChange={handleInput} 
                    placeholder="Priority" 
                    name="priority" 
                    value={todo.priority} 
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
                <AgGridReact
                    rowData={todos}
                    columnDefs={columnDefs}
                    defaultColDef={{
                        floatingFilter: true,
                        filter: true,
                    }}
                />
            </div>
        </>
    );
}

export default TodoList;
