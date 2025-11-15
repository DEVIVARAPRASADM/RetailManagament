// src/components/CreateOrderModal.jsx (FINAL WORKING VERSION)

import React, { useState, useEffect, useMemo } from 'react';
import { 
    Modal, Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel, 
    Divider, IconButton, Paper, List, ListItem, ListItemText, Tooltip, InputAdornment, 
    CircularProgress, Chip
} from '@mui/material';
import { Add, Remove, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import { createOrder } from '../services/orderService';
import { fetchProducts } from '../services/productService'; 

const mockSuppliers = [
    { _id: '60c7282b0e95c100155b9a71', name: 'Global Tech Distributors' },
    { _id: '60c7282b0e95c100155b9a72', name: 'Local Apparel Wholesalers' }, 
    { _id: '60c7282b0e95c100155b9a73', name: 'Fresh Produce Depot' },      
];

const style = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    width: 800, maxHeight: '90vh', bgcolor: 'background.paper', boxShadow: 24, p: 4,
    borderRadius: 2, display: 'flex', flexDirection: 'column',
};

const CreateOrderModal = ({ open, handleClose, loadOrders }) => {
    const [supplierId, setSupplierId] = useState('');
    const [items, setItems] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [allProducts, setAllProducts] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');

    const resetForm = () => {
        setItems([]);
        setSupplierId('');
        setSearchTerm('');
        setLoading(false);
    };

    // --- Data Fetching ---
    useEffect(() => {
        const loadProductData = async () => {
            try {
                const res = await fetchProducts(); 
                setAllProducts(res.data.map(p => ({ ...p, price: p.price || 0 })));
            } catch (error) {
                console.error("Failed to load products for order modal:", error);
                setAllProducts([]); 
            }
        };
        if (open) {
            resetForm(); 
            loadProductData();
        }
    }, [open]);

    // --- HANDLER IMPLEMENTATIONS (FIXED) ---
    const handleAddItem = (product) => {
        const unitCost = product.price || 0; 
        const existingItem = items.find(item => item.product_id === product._id);
        if (existingItem) {
             setItems(items.map(item => 
                 item.product_id === product._id 
                 ? { ...item, quantity: item.quantity + 1 } 
                 : item
             ));
             return;
        }

        setItems(prevItems => [
            ...prevItems,
            { product_id: product._id, product_name: product.name, quantity: 1, price: unitCost }
        ]);
        setSearchTerm('');
    };

    const handleQuantityChange = (productId, change) => {
        setItems(prevItems => prevItems.map(item => {
            if (item.product_id === productId) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const handleUnitCostChange = (productId, newCost) => {
        setItems(prevItems => prevItems.map(item => {
            if (item.product_id === productId) {
                const costValue = parseFloat(newCost);
                // Ensure price is a valid number for sending to the backend
                return { ...item, price: isNaN(costValue) || costValue < 0 ? 0 : costValue };
            }
            return item;
        }));
    };

    const handleRemoveItem = (productId) => {
        setItems(prevItems => prevItems.filter(item => item.product_id !== productId));
    };

    // CRITICAL FIX: The handleSubmit function with data validation
    const handleSubmit = async () => {
        if (!supplierId || items.length === 0) {
            alert('Please select a Supplier and add at least one item.');
            return;
        }

        setLoading(true);
        try {
            // Validate and prepare data for the backend
            const itemsToSend = items.map(item => {
                const quantity = parseInt(item.quantity, 10);
                const price = parseFloat(item.price);
                
                if (isNaN(quantity) || quantity <= 0) {
                     throw new Error(`Invalid quantity for ${item.product_name}. Must be > 0.`);
                }
                if (isNaN(price) || price < 0) {
                     throw new Error(`Invalid unit cost for ${item.product_name}. Must be >= 0.`);
                }

                return {
                    product_id: item.product_id,
                    quantity: quantity,
                    price: price
                };
            });

            const orderData = {
                supplier_id: supplierId,
                items: itemsToSend,
            };
            
            // API Call
            await createOrder(orderData);
            
            alert('Purchase Order submitted successfully!');
            loadOrders(); 
            handleClose();
            resetForm(); 

        } catch (error) {
            console.error('Failed to create order:', error.response?.data?.message || error.message);
            // Show the user the most specific error message
            alert(`Error creating Purchase Order: ${error.message || error.response?.data?.message || 'Server Error. Check console.'}`);
        } finally {
            setLoading(false);
        }
    };
    // --- END HANDLER IMPLEMENTATIONS ---
    
    const totalCost = useMemo(() => 
        items.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2), 
    [items]);

    const filteredProducts = allProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 10);

    return (
        <Modal open={open} onClose={() => { resetForm(); handleClose(); }} aria-labelledby="create-order-modal">
           {/* Modal Content Structure */}
           <Box sx={style}>
                <Typography id="create-order-modal-title" variant="h5" component="h2" sx={{ mb: 2 }}>
                    Create New Purchase Order
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {/* Main Inputs (Supplier, Date) */}
                <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Supplier</InputLabel>
                        <Select
                            label="Supplier"
                            value={supplierId}
                            onChange={(e) => setSupplierId(e.target.value)}
                        >
                            <MenuItem value=""><em>None Selected</em></MenuItem>
                            {mockSuppliers.map(s => (
                                // THIS MUST BE CORRECT: value={s._id}
                                <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>
                            ))}
                        </Select>

                    </FormControl>

                    <TextField fullWidth size="small" label="Expected Delivery Date (Optional)" type="date" InputLabelProps={{ shrink: true }} />
                </Box>
                
                <Divider sx={{ mb: 2 }}><Chip label="Order Items" size="small" /></Divider>

                {/* Content Area (Search + Cart) */}
                <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
                    {/* LEFT SIDE: Product Search and Selection */}
                    <Box sx={{ width: '40%', pr: 2, borderRight: 1, borderColor: 'divider', overflowY: 'auto' }}>
                        <TextField fullWidth label="Search Product to Add" size="small" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} sx={{ mb: 1 }}/>
                        <Paper sx={{ maxHeight: 300, overflowY: 'auto' }} variant="outlined">
                            <List dense>
                                {filteredProducts.length === 0 ? (
                                    <ListItem><ListItemText primary="No products found" /></ListItem>
                                ) : (
                                    filteredProducts.map(product => (
                                        <ListItem 
                                            key={product._id} 
                                            secondaryAction={
                                                <IconButton edge="end" onClick={() => handleAddItem(product)} color="primary"><Add /></IconButton>
                                            }
                                        >
                                            <ListItemText primary={product.name} secondary={`Stock: ${product.stock || 0} | Last Cost: ₹${(product.price || 0).toFixed(2)}`}/>
                                        </ListItem>
                                    ))
                                )}
                            </List>
                        </Paper>
                    </Box>

                    {/* RIGHT SIDE: Current Order Items */}
                    <Box sx={{ width: '60%', pl: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>{items.length} Items in Order</Typography>
                        <List sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: 350 }}>
                            {items.length === 0 ? (
                                <Typography color="text.secondary" sx={{ p: 2 }}>Search and add products to the purchase order.</Typography>
                            ) : (
                                items.map(item => (
                                    <ListItem 
                                        key={item.product_id}
                                        secondaryAction={
                                            <IconButton edge="end" onClick={() => handleRemoveItem(item.product_id)} color="error" size="small"><DeleteIcon /></IconButton>
                                        }
                                        sx={{ bgcolor: 'grey.50', mb: 1, borderRadius: 1 }}
                                    >
                                        <ListItemText primary={<Tooltip title={item.product_name}><Typography noWrap>{item.product_name}</Typography></Tooltip>} secondary={`Total Line Cost: ₹${(item.quantity * item.price).toFixed(2)}`} sx={{ flexGrow: 1, pr: 1, minWidth: 0 }}/>
                                        
                                        <TextField label="Unit Cost" size="small" type="number" value={item.price} onChange={(e) => handleUnitCostChange(item.product_id, e.target.value)} sx={{ width: 100, mr: 1 }} inputProps={{ step: "0.01", min: "0" }}/>

                                        <Box display="flex" alignItems="center" sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
                                            <IconButton size="small" onClick={() => handleQuantityChange(item.product_id, -1)} disabled={item.quantity <= 1}><Remove /></IconButton>
                                            <Typography sx={{ width: 30, textAlign: 'center' }}>{item.quantity}</Typography>
                                            <IconButton size="small" onClick={() => handleQuantityChange(item.product_id, 1)}><Add /></IconButton>
                                        </Box>
                                    </ListItem>
                                ))
                            )}
                        </List>

                        <Divider sx={{ my: 2 }} />

                        {/* Total Cost and Submit Button */}
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Total PO Cost: <span style={{ color: 'red' }}>₹{totalCost}</span>
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                disabled={loading || items.length === 0 || !supplierId}
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                            >
                                {loading ? 'Submitting...' : 'Submit Purchase Order'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default CreateOrderModal;