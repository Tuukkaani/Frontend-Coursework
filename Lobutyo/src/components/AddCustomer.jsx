import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Fab } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';

function AddCustomer({ onAdd }) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: '',
    });

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        })
            .then(() => {
                onAdd();
                setOpen(false);
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <Fab
                color="primary"
                aria-label="add"
                variant="extended"
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px 20px',
                    fontWeight: 600,
                }}
                onClick={() => setOpen(true)}
            >
                <AddIcon sx={{ mr: 1 }} />
                ADD CUSTOMER
            </Fab>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogContent>
                    <TextField label="First Name" name="firstname" fullWidth onChange={handleChange} />
                    <TextField label="Last Name" name="lastname" fullWidth onChange={handleChange} />
                    <TextField label="Email" name="email" fullWidth onChange={handleChange} />
                    <TextField label="Phone" name="phone" fullWidth onChange={handleChange} />
                    <TextField label="Street Address" name="streetaddress" fullWidth onChange={handleChange} />
                    <TextField label="Postcode" name="postcode" fullWidth onChange={handleChange} />
                    <TextField label="City" name="city" fullWidth onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddCustomer;
