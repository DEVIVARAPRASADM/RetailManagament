import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
    Box, Typography, Button, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, IconButton, Chip, Tooltip 
} from '@mui/material';
import { Refresh, Add, CheckCircle, LocalShipping, HourglassEmpty } from '@mui/icons-material';
import { fetchOrders, markOrderAsReceived } from '../services/orderService';
import { format } from 'date-fns';

// Helper to get a color and icon for the status chip
const getStatusChip = (status) => {
    switch (status) {
        case 'processing':
            return { color: 'warning', icon: <HourglassEmpty /> };
        case 'shipped':
            return { color: 'info', icon: <LocalShipping /> };
        case 'delivered':
            return { color: 'success', icon: <CheckCircle /> };
        case 'cancelled':
            return { color: 'error' };
        default:
            return { color: 'default' };
    }
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await fetchOrders();
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [location]);

  const handleReceiveOrder = async (orderId) => {
      if (window.confirm("Are you sure you want to mark this order as received? This will add the items to your inventory.")) {
          try {
              // This is where you call the API function from '../services/orderService'
              await markOrderAsReceived(orderId);
              alert('Order received and inventory updated!');
              loadOrders(); // Refresh the list
          } catch (error) {
              // Handle the error object from axios or fetch
              alert(`Error: ${error.response?.data?.message || 'Could not update order.'}`);
          }
      }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Purchase Order History</Typography>
        <Box>
            <IconButton onClick={loadOrders}><Refresh /></IconButton>
            <Button 
              variant="contained" 
              startIcon={<Add />} 
              // FIX: Rename the button to clearly indicate the user's desired action: placing an order
              onClick={() => navigate('/new-order')} 
            >
              Place New Order
            </Button>
        </Box>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>PO ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Supplier</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total Cost</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Order Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} align="center">Loading order history...</TableCell></TableRow>
              ) : orders.length === 0 ? (
                <TableRow><TableCell colSpan={6} align="center">No Purchase Orders found in history.</TableCell></TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order._id} hover>
                    <TableCell>{order._id.slice(-6).toUpperCase()}</TableCell>
                    {/* NOTE: Safely access supplier name - depends on proper population of supplier_id */}
                    <TableCell>{order.supplier_id ? order.supplier_id.name : 'N/A'}</TableCell> 
                    <TableCell>₹{order.total_price ? order.total_price.toFixed(2) : '0.00'}</TableCell>
                    <TableCell>
                        <Chip 
                            label={order.status} 
                            color={getStatusChip(order.status).color}
                            icon={getStatusChip(order.status).icon}
                            size="small" 
                        />
                    </TableCell>
                    <TableCell>{format(new Date(order.created_at), 'dd MMM yyyy')}</TableCell>
                    <TableCell>
                        {order.status !== 'delivered' && order.status !== 'cancelled' && (
                             <Tooltip title="Mark as Received & Add to Inventory">
                                <Button 
                                    variant="outlined" 
                                    size="small" 
                                    color="success"
                                    onClick={() => handleReceiveOrder(order._id)}
                                >
                                    Receive
                                </Button>
                             </Tooltip>
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

export default OrdersPage;