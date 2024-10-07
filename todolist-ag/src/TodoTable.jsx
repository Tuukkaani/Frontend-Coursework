import React from "react";

function TodoTable({ todos, deleteTodo }) {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Priority</th>
                </tr>
                {todos.map((item, index) => (
                    <tr key={index}>
                        <td>{item.desc}</td>
                        <td>{item.date}</td>
                        <td>{item.priority}</td>
                        <td><button onClick={() => deleteTodo(index)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TodoTable;