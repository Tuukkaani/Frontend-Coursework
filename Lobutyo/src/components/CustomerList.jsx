import React, { useState, useEffect } from 'react';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';
import MaterialTable from '@material-table/core';

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
    }

    const columns = [
        { title: "First Name", field: "firstname" },
        { title: "Last Name", field: "lastname" },
        { title: "Street Addr.", field: "streetaddress" },
        { title: "Postcode field", field: "postcode" },
        { title: "City", field: "city" },
        { title: "Email", field: "email" },
        { title: "Phone", field: "phone" },
        {
            title: "Actions",
            render: (rowData) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <EditCustomer customer={rowData} onEdit={fetchData} />
                    <DeleteCustomer url={rowData._links.self.href} onDelete={fetchData} />
                </div>
            ),
        },
    ];

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                title="Customer List"
                columns={columns}
                data={customers}
                options={{
                    search: true,
                    paging: true,
                    sorting: true,
                    filtering: false,
                }}
            />
            <AddCustomer onAdd={fetchData} />
        </div>
    );
}

export default CustomerList;