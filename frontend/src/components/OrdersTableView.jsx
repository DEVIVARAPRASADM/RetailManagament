// src/components/OrdersTableView.jsx
import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Chip, IconButton, CircularProgress 
} from '@mui/material';
import { 
    CheckCircleOutline as CheckIcon, DeleteOutline as DeleteIcon,
    Visibility as ViewIcon, Refresh as RefreshIcon, ArrowBackIosNew as BackIcon 
} from '@mui/icons-material';
import { fetchOrders, receiveOrder, deleteOrder } from '../services/orderService'; 


const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
const getStatusChip = (status) => <Chip label={status || 'Unknown'} color={status === 'delivered' ? 'success' : 'primary'} size="small" />;


const OrdersTableView = ({ onBackToCatalog }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const response = await fetchOrders();
            // Assuming your backend sends the array directly:
            setOrders(response.data || []); 
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            alert(`Error: ${error.message}. Could not load orders.`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    // Placeholder handlers (using simple window alerts)
    const handleReceiveOrder = async (orderId) => {
         if (window.confirm("Mark as DELIVERED and update inventory?")) {
             await receiveOrder(orderId);
             loadOrders();
         }
    };
    const handleDeleteOrder = async (orderId) => { /* ... delete logic ... */ };
    const handleViewOrder = (order) => { 
        alert(`Viewing Order ${order._id.slice(-6)}\nTotal: ₹${(order.total_price || 0).toFixed(2)}`);
    };

    return (
        <Box sx={{ p: 0 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Purchase Order History
                </Typography>
                <Box>
                    <IconButton onClick={loadOrders} color="primary" sx={{mr: 1}}><RefreshIcon /></IconButton>
                    <Button 
                        variant="outlined" 
                        startIcon={<BackIcon />} 
                        onClick={onBackToCatalog}
                    >
                        Back to New Order
                    </Button>
                </Box>
            </Box>

            <Paper elevation={3}>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                             {/* ... (Table Header as previously designed) ... */}
                            <TableRow sx={{ '& th': { fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}}>
                                <TableCell>PO ID</TableCell>
                                <TableCell>Supplier</TableCell>
                                <TableCell align="right">Total Cost</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Order Date</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (<TableRow><TableCell colSpan={6} align="center" sx={{ py: 4 }}><CircularProgress size={30} /></TableCell></TableRow>) 
                            : orders.length === 0 ? (<TableRow><TableCell colSpan={6} align="center" sx={{ py: 4 }}>No Purchase Orders found in history.</TableCell></TableRow>) 
                            : (
                                orders.map((order) => (
                                    <TableRow key={order._id || Math.random()} hover>
                                        <TableCell>{order._id?.slice(-6) || 'N/A'}</TableCell>
                                        <TableCell>{order.supplier_id?.name || 'N/A'}</TableCell>
                                        <TableCell align="right">₹{(order.total_price || 0).toFixed(2)}</TableCell>
                                        <TableCell>{getStatusChip(order.status)}</TableCell>
                                        <TableCell>{formatDate(order.created_at)}</TableCell> 
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleViewOrder(order)} color="info" size="small"><ViewIcon /></IconButton>
                                            {order.status !== 'delivered' && order.status !== 'cancelled' && (
                                                <IconButton onClick={() => handleReceiveOrder(order._id)} color="success" size="small" sx={{ mx: 1 }}><CheckIcon /></IconButton>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default OrdersTableView;