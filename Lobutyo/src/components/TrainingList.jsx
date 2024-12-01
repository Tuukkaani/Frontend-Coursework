import React, { useState, useEffect } from 'react';
import MaterialTable from '@material-table/core';
import { format } from 'date-fns';

function TrainingList() {
    const [trainingSessions, setTrainingSessions] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings')
            .then(response => response.json())
            .then(data => setTrainingSessions(data))
    }

    const formatDate = (date) => {
        return format(new Date(date), 'MMMM dd, yyyy hh:mm a');
    };

    const columns = [
        {
            title: "Date",
            field: "date",
            render: rowData => formatDate(rowData.date),
        },
        { title: "Duration (min)", field: "duration" },
        { title: "Activity", field: "activity" },
        {
            title: "Customer", field: "customer",
            render: rowData => (
                rowData.customer ? `${rowData.customer.firstname} ${rowData.customer.lastname}` : 'N/A'
            ),
        },
    ];

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                title="Training List"
                columns={columns}
                data={trainingSessions}
                options={{
                    search: true,
                    paging: true,
                    sorting: true,
                    filtering: false,
                }}
            />
        </div>
    );
}

export default TrainingList;