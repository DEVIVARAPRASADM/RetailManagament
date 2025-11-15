// src/components/SupplierModal.jsx
import React, { useState, useEffect } from 'react';
import { 
    Modal, Box, Typography, Button, TextField, Divider, CircularProgress
} from '@mui/material';
import { createSupplier, updateSupplier } from '../services/supplierService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const SupplierModal = ({ open, handleClose, loadSuppliers, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        contact_person: '',
        phone: '',
        email: '',
        notes: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const isEditMode = !!initialData;

    useEffect(() => {
        if (isEditMode) {
            setFormData({
                name: initialData.name || '',
                contact_person: initialData.contact_person || '',
                phone: initialData.phone || '',
                email: initialData.email || '',
                notes: initialData.notes || '',
            });
        } else {
            setFormData({ name: '', contact_person: '', phone: '', email: '', notes: '' });
        }
        setError('');
    }, [initialData, isEditMode, open]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.name.trim() || !formData.phone.trim()) {
            setError('Supplier Name and Phone are required.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            if (isEditMode) {
                await updateSupplier(initialData._id, formData);
                alert(`Supplier ${formData.name} updated successfully.`);
            } else {
                await createSupplier(formData);
                alert(`New Supplier ${formData.name} added successfully.`);
            }
            loadSuppliers(); 
            handleClose(); 

        } catch (err) {
            console.error("API Submission Error:", err.response?.data);
            setError(err.response?.data?.message || 'An unexpected error occurred. Check network/server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={loading ? () => {} : handleClose}>
            <Box sx={style}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                    {isEditMode ? 'Edit Supplier Details' : 'Add New Supplier'}
                </Typography>

                <TextField
                    fullWidth
                    label="Supplier Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    size="small"
                    margin="normal"
                    disabled={loading}
                />
                
                <TextField
                    fullWidth
                    label="Phone Number *"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    size="small"
                    margin="normal"
                    disabled={loading}
                />

                <TextField
                    fullWidth
                    label="Contact Person"
                    name="contact_person"
                    value={formData.contact_person}
                    onChange={handleChange}
                    size="small"
                    margin="normal"
                    disabled={loading}
                />
                
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    size="small"
                    margin="normal"
                    disabled={loading}
                />
                
                <TextField
                    fullWidth
                    label="Notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    multiline
                    rows={2}
                    size="small"
                    margin="normal"
                    disabled={loading}
                />

                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}

                <Divider sx={{ my: 3 }} />

                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button 
                        variant="outlined" 
                        onClick={handleClose} 
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSubmit} 
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={20} color="inherit" />}
                    >
                        {isEditMode ? 'Update Supplier' : 'Save Supplier'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default SupplierModal;