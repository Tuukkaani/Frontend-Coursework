import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function EditCustomer({ customer, onEdit }) {
    const [open, setOpen] = useState(false);
    const [updatedCustomer, setUpdatedCustomer] = useState(customer);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUpdatedCustomer({ ...updatedCustomer, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        setLoading(true);
        fetch(customer._links.self.href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCustomer),
        })
        .then(() => {
            onEdit();
            setOpen(false);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    };

    return (
        <>
            <IconButton color="primary" onClick={() => setOpen(true)} aria-label="edit customer">
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate autoComplete="off">
                        <TextField
                            label="First Name"
                            name="firstname"
                            value={updatedCustomer.firstname || ''}
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            variant="outlined"
                        />
                        <TextField
                            label="Last Name"
                            name="lastname"
                            value={updatedCustomer.lastname || ''}
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            variant="outlined"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={updatedCustomer.email || ''}
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            variant="outlined"
                            type="email"
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            value={updatedCustomer.phone || ''}
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            variant="outlined"
                            type="tel"
                        />
                        <TextField
                            label="Street Address"
                            name="streetaddress"
                            value={updatedCustomer.streetaddress || ''}
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            variant="outlined"
                        />
                        <TextField
                            label="Postcode"
                            name="postcode"
                            value={updatedCustomer.postcode || ''}
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                        />
                        <TextField
                            label="City"
                            name="city"
                            value={updatedCustomer.city || ''}
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary" disabled={loading}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        color="primary" 
                        variant="contained"
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditCustomer;
