import React from "react";

function TodoTable({ todos, deleteTodo }) {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Description</th>
                    <th>Date</th>
                </tr>
                {todos.map((item, index) => (
                    <tr key={index}>
                        <td>{item.desc}</td>
                        <td>{item.date}</td>
                        <td><button onClick={() => deleteTodo(index)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TodoTable;