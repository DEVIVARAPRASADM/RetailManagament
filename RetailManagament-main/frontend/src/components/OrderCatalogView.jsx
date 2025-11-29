// src/components/OrderCatalogView.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { 
    Box, Typography, Button, TextField, IconButton, CircularProgress, Grid,
    Card, CardMedia, CardContent, InputAdornment, FormControl, InputLabel, Select, MenuItem,
    Divider, List, ListItem, ListItemText, Tooltip
} from '@mui/material';
import { 
    Search as SearchIcon, Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon,
    ShoppingCart as CartIcon
} from '@mui/icons-material';
import { fetchProducts } from '../services/productService'; // Products for catalog
import { createOrder } from '../services/orderService';     // API for submission
// NOTE: Reusing the same mock data for suppliers
const mockSuppliers = [
    { _id: '60c7282b0e95c100155b9a71', name: 'Global Tech Distributors' },
    { _id: '60c7282b0e95c100155b9a72', name: 'Local Apparel Wholesalers' },
    { _id: '60c7282b0e95c100155b9a73', name: 'Fresh Produce Depot' },      
];
// Threshold for Low Stock Chip visibility
const LOW_STOCK_THRESHOLD = 5;


// Product Card for Catalog
const ProductCatalogCard = ({ product, onAdd }) => {
    const isLowStock = product.stock <= LOW_STOCK_THRESHOLD;
    const isOutOfStock = product.stock === 0;
    
    return (
        <Card sx={{ height: '100%', position: 'relative', cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={() => !isOutOfStock && onAdd(product)}>
             <CardMedia component="img" height="90" image={`https://picsum.photos/100/100?random=${product._id.slice(-4)}`} alt={product.name} sx={{ objectFit: 'cover' }}/>
            <CardContent sx={{ p: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold', lineHeight: 1.2, height: '1.5rem', overflow: 'hidden' }}>{product.name}</Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5}>
                    <Typography variant="body2" color="text.secondary">
                        Stock: <span style={{ fontWeight: 'bold', color: isLowStock ? 'red' : 'green'}}>{product.stock || 0}</span>
                    </Typography>
                    <IconButton size="small" color="primary" disabled={isOutOfStock}><AddIcon /></IconButton>
                </Box>
            </CardContent>
            {isLowStock && <Box sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'error.main', color: 'white', p: '2px 6px', borderRadius: '0 0 0 4px', fontSize: 10, fontWeight: 'bold' }}>LOW</Box>}
        </Card>
    );
};

const OrderCatalogView = ({ onLoadOrderHistory }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [draftItems, setDraftItems] = useState([]);
    const [supplierId, setSupplierId] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);
    
    // --- Data Fetching ---
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const res = await fetchProducts(); 
                // Ensure stock is available for the check
                setAllProducts(res.data.map(p => ({ ...p, stock: p.stock === undefined ? 10 : p.stock, price: p.price || 0 })));
            } catch (error) {
                console.error("Failed to load products for catalog:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    // Handlers (Re-use/Simplified from Modal logic)
    const handleAddItem = (product) => { /* Logic to add to draftItems state */ };
    const handleQuantityChange = (productId, change) => { /* Logic to update quantity */ };
    const handleUnitCostChange = (productId, newCost) => { /* Logic to update price (cost) */ };
    const handleRemoveItem = (productId) => { /* Logic to remove item */ };
    
    const handleSubmitPO = async () => {
        if (!supplierId || draftItems.length === 0) {
            alert('Please select a Supplier and add at least one item.');
            return;
        }

        // Implementation of the validated submit logic (from final fixed code)
        // ... (The successful POST logic will go here) ...

        // After success:
        // alert('Purchase Order submitted successfully!');
        // setDraftItems([]); // Clear cart
        // setSupplierId('');
        // onLoadOrderHistory(); // Switch to history view

        // Placeholder for submitting logic:
        alert("Submitting logic placeholder triggered! Look at console for error check.");
        setDraftItems([]);
        setSupplierId('');
        onLoadOrderHistory();
    };

    // Derived State and Filtering
    const totalPOCost = useMemo(() => 
        draftItems.reduce((total, item) => total + (item.quantity * item.price), 0), 
    [draftItems]);

    const lowStockFilter = allProducts.filter(p => p.stock <= LOW_STOCK_THRESHOLD);

    const filteredCatalog = (searchTerm === '' ? allProducts : allProducts)
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Box sx={{ display: 'flex', height: '100%', pt: 2 }}>
            
            {/* 65% LEFT: Order Catalog View */}
            <Box sx={{ flex: 3, pr: 3, borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                     <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Order Catalog</Typography>
                     <Button variant="outlined" size="small" onClick={onLoadOrderHistory}>View Order History</Button>
                </Box>
                
                {/* Search Bar */}
                <TextField
                    fullWidth
                    label="Search or Scan Product"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
                    sx={{ mb: 2 }}
                />
                
                {/* Quick Filter: Low Stock (e-commerce style emphasis) */}
                <Button variant="contained" color="warning" size="small" sx={{mb: 2, justifyContent: 'flex-start'}} disabled>
                     <Box component="span" sx={{fontWeight: 'bold'}}>Low Stock Items ({lowStockFilter.length})</Box>
                </Button>


                {/* Product Catalog Grid */}
                <Box sx={{ overflowY: 'auto', flexGrow: 1, pr: 1 }}>
                    {loading ? <CircularProgress /> : (
                         <Grid container spacing={2}>
                            {filteredCatalog.map((product) => (
                                <Grid item xs={6} sm={4} md={3} lg={2} key={product._id}>
                                    <ProductCatalogCard product={product} onAdd={handleAddItem} />
                                </Grid>
                            ))}
                         </Grid>
                    )}
                </Box>
            </Box>

            {/* 35% RIGHT: Order Draft (Cart) */}
            <Box sx={{ flex: 1.5, pl: 3, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Order Draft <CartIcon fontSize="small" sx={{ verticalAlign: 'middle', ml: 1 }}/></Typography>

                {/* Supplier Selection */}
                <FormControl fullWidth size="small" sx={{mb: 2}}>
                    <InputLabel>Select Supplier (Required)</InputLabel>
                    <Select label="Select Supplier (Required)" value={supplierId} onChange={(e) => setSupplierId(e.target.value)}>
                        <MenuItem value=""><em>None</em></MenuItem>
                        {mockSuppliers.map(s => (<MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>))}
                    </Select>
                </FormControl>
                
                <Divider sx={{ mb: 2 }}/>

                {/* Cart Items List */}
                <List sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
                    {draftItems.length === 0 ? (
                        <Typography color="text.secondary" sx={{ p: 2 }}>Add items from the catalog to build your purchase order.</Typography>
                    ) : (
                       // Mapped Items with controls for Unit Cost and Quantity
                       draftItems.map(item => (
                           <ListItem key={item.product_id} disablePadding sx={{ mb: 1, border: '1px solid #ddd', borderRadius: 1 }}>
                               {/* ... (Detailed List Item Structure omitted for brevity, reusing the robust modal design) */}
                               <ListItemText 
                                   primary={<Tooltip title={item.product_name}><Typography noWrap>{item.product_name}</Typography></Tooltip>}
                                   secondary={`Total: ₹${(item.quantity * item.price).toFixed(2)}`}
                                   sx={{ flexGrow: 1, pr: 1, minWidth: 0, pl: 1 }}
                               />
                           </ListItem>
                       ))
                    )}
                </List>

                <Divider sx={{ mb: 2 }}/>

                {/* Final Total and Submit */}
                <Box sx={{ p: 1, border: '2px solid', borderColor: 'primary.main', borderRadius: 1, mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Total PO Cost: <span style={{ color: 'red' }}>₹{totalPOCost.toFixed(2)}</span>
                    </Typography>
                </Box>
                
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSubmitPO}
                    disabled={submitLoading || draftItems.length === 0 || !supplierId}
                    startIcon={submitLoading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
                >
                    {submitLoading ? 'Placing Order...' : 'Submit Purchase Order'}
                </Button>
            </Box>
        </Box>
    );
};

export default OrderCatalogView;