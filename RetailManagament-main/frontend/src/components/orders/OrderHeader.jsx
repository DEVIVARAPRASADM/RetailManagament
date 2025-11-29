import React from 'react';
import { Paper, Box, Typography, TextField, InputAdornment } from '@mui/material';
import { Storefront, ArrowDropDown, Search } from '@mui/icons-material';

const OrderHeader = ({ searchTerm, onSearchChange }) => {
    return (
        <Paper elevation={1} sx={{ p: 2, position: 'sticky', top: '90px', zIndex: 10, bgcolor: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Storefront color="primary" sx={{ mr: 1.5 }} />
                <Typography sx={{ fontWeight: 'bold' }}>#512, 12th Cross Road...</Typography>
                <ArrowDropDown sx={{ ml: 'auto' }} />
            </Box>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search for dal, rice, oil..."
                InputProps={{
                    startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                    sx: { borderRadius: '8px' }
                }}
                value={searchTerm}
                onChange={onSearchChange}
            />
        </Paper>
    );
};

export default OrderHeader;