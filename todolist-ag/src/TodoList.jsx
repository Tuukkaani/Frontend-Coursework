import { useState, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function TodoList() {
    const [todo, setTodo] = useState({
        description: "",
        date: null,
        priority: ""
    });

    const [todos, setTodos] = useState([]);

    const gridRef = useRef();

    const rowSelection = useMemo(() => {
        return {
            mode: 'singleRow',
        };
    }, []);

    const columnDefs = [
        { field: "description", filter: "agTextColumnFilter", floatingFilter: true },
        { field: "date", filter: "agTextColumnFilter", floatingFilter: true, },
        {
            field: "priority", filter: "agTextColumnFilter", floatingFilter: true,
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
        }
    ];

    const [tabValue, setTabValue] = useState("1");

    const handleInput = (event) => {
        setTodo({ ...todo, [event.target.name]: event.target.value });
    };

    const handleDate = (newDate) => {
        setTodo({ ...todo, date: newDate });
    };

    const handleTabs = (event, newTab) => {
        setTabValue(newTab);
    };

    const addTodo = () => {
        if (!todo.description || !todo.date || !todo.priority) {
            alert("All fields are required!");
            return;
        }

        setTodos([...todos, todo]);
        setTodo({
            date: null,
            description: "",
            priority: ""
        });
    };

    const handleDelete = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) =>
                index != gridRef.current.getSelectedNodes()[0].id))
        }
        else {
            alert('Select a row first!');
        }
    };

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabs} aria-label="lab API tabs example">
                            <Tab label="Home" value="1" />
                            <Tab label="ToDoList" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">HELLO TEAM! WELCOME TO TODO!</TabPanel>
                    <TabPanel value="2">
                        <div>
                            <input
                                type="text"
                                onChange={handleInput}
                                placeholder="Description"
                                name="description"
                                value={todo.description}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
                                    value={todo.date}
                                    onChange={handleDate}
                                />
                            </LocalizationProvider>
                            <input
                                type="text"
                                onChange={handleInput}
                                placeholder="Priority"
                                name="priority"
                                value={todo.priority}
                            />
                            <button onClick={addTodo}>Add</button>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                        <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
                            <AgGridReact
                                ref={gridRef}
                                onGridReady={params => gridRef.current = params.api}
                                rowData={todos}
                                columnDefs={columnDefs}
                                rowSelection={rowSelection}
                                defaultColDef={{
                                    floatingFilter: true,
                                    filter: true,
                                }}
                            />
                        </div>
                    </TabPanel>
                </TabContext>
            </Box>

        </>
    );
}

export default TodoList;
