import React, { useState, useEffect } from 'react';
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
        { title: "Post Code", field: "postcode" },
        { title: "City", field: "city" },
        { title: "Email", field: "email" },
        { title: "Phone", field: "phone" }
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
        </div>
    );
}

export default CustomerList;