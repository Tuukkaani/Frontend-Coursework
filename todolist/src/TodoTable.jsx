import React from 'react';

function TodoTable({ todos, deleteTodo }) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo =>
                            <tr key={todo}>
                                <td>{todo.description}</td>
                                <td>{todo.date}</td>
                                <td><button onClick={() => deleteTodo(todo)}>Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default TodoTable;