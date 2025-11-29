import React, { useState, useEffect, useMemo } from 'react';
import { 
    Box, Typography, Grid, Paper, TextField, List, ListItem, ListItemText, 
    IconButton, Button, Divider, InputAdornment, Card, CardMedia, CardContent, Chip 
} from '@mui/material';
import { 
    AddCircleOutline, RemoveCircleOutline, Delete, Search as SearchIcon, 
    Category as CategoryIcon, ShoppingCart as CartIcon 
} from '@mui/icons-material';
import { fetchProducts } from '../services/productService';
import { recordSale } from '../services/saleService';

const BACKEND_URL = 'http://localhost:5001';

const ProductCard = ({ product, onAdd }) => {
    const isOutOfStock = product.stock === 0;
    const imageUrl = product.image_url ? `${BACKEND_URL}/${product.image_url}` : 'https://via.placeholder.com/150?text=No+Image';

    return (
        <Card sx={{ cursor: 'pointer', height: '100%', position: 'relative', opacity: isOutOfStock ? 0.6 : 1, display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: !isOutOfStock ? 6 : 1 } }} onClick={() => !isOutOfStock && onAdd(product)} elevation={2} >
            <Box sx={{ height: 140, overflow: 'hidden' }}>
                <CardMedia component="img" image={imageUrl} alt={product.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <CardContent sx={{ p: 1.5, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', lineHeight: 1.3, mb: 1, height: '2.6em', overflow: 'hidden' }}>{product.name}</Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'success.main' }}>₹{product.price.toFixed(2)}</Typography>
                     <IconButton size="small" color="primary" disabled={isOutOfStock} onClick={(e) => { e.stopPropagation(); onAdd(product); }}><AddCircleOutline /></IconButton>
                </Box>
            </CardContent>
            <Box sx={{ position: 'absolute', top: 0, right: 0, bgcolor: isOutOfStock ? 'error.main' : 'warning.light', color: isOutOfStock ? 'white' : 'black', p: '2px 8px', borderRadius: '0 0 0 8px', fontSize: '0.65rem', fontWeight: 'bold', visibility: isOutOfStock || product.stock < 10 ? 'visible' : 'hidden' }}>{isOutOfStock ? 'OUT OF STOCK' : `LOW (${product.stock})`}</Box>
        </Card>
    );
};

const categories = ['All', 'Groceries', 'Electronics', 'Apparel', 'Home Goods'];

const SalesPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetchProducts();
      setAllProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + 1, product.stock);
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (productId, change) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item._id === productId) {
          const newQuantity = Math.max(1, Math.min(item.quantity + change, item.stock));
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  const handleSubmitSale = async () => {
    if (cart.length === 0) return;
    try {
      await recordSale(cart);
      alert('Sale recorded successfully! Inventory has been updated.');
      setCart([]);
      loadProducts();
    } catch (error) {
      console.error("Failed to record sale", error);
      alert(`Error: ${error.response?.data?.message || 'Could not record sale.'}`);
    }
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p =>
      (selectedCategory === 'All' || p.category === selectedCategory) &&
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || (p._id && p._id.slice(-6).toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }, [searchTerm, allProducts, selectedCategory]);

  const subTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 110px)', p: 3, bgcolor: '#f8fafc' }}>
      
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, flexShrink: 0 }}>
        RetailSense Point of Sale
      </Typography>

      <Box sx={{ display: 'flex', flexGrow: 1, gap: 3, overflow: 'hidden' }}>

        {/* === COLUMN 1: PRODUCT CATALOG (approx 65%) === */}
        <Paper sx={{ width: '65%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} elevation={2}>
          <Box sx={{ p: 2, pb: 1, flexShrink: 0 }}>
            <TextField fullWidth label="Search Products (Name or ID)" size="small" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>), }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {categories.map((cat) => (<Chip key={cat} label={cat} variant={selectedCategory === cat ? 'filled' : 'outlined'} color={selectedCategory === cat ? 'primary' : 'default'} onClick={() => setSelectedCategory(cat)} />))}
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
            {loading ? (<Typography sx={{ textAlign: 'center', p: 5 }}>Loading Products...</Typography>) 
             : filteredProducts.length === 0 ? (<Typography sx={{ textAlign: 'center', p: 5 }}>No products found.</Typography>) 
             : (<Grid container spacing={2}>{filteredProducts.map((product) => (<Grid item xs={6} sm={4} md={4} lg={3} key={product._id}><ProductCard product={product} onAdd={handleAddToCart} /></Grid>))}</Grid>)}
          </Box>
        </Paper>

        {/* === COLUMN 2: CART & CHECKOUT (approx 35%) === */}
        <Paper sx={{ width: '35%', display: 'flex', flexDirection: 'column', p: 2, overflow: 'hidden' }} elevation={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', borderBottom: 1, borderColor: 'divider', pb: 1, mb: 1, flexShrink: 0 }}>
              Current Sale<Chip icon={<CartIcon />} label={`${cart.length} items`} size="small" sx={{ float: 'right' }} color="primary" />
          </Typography>
          <List sx={{ flexGrow: 1, overflowY: 'auto', mx: -2 }}>
              {cart.length === 0 && <ListItem><ListItemText primary="Cart is empty" sx={{ textAlign: 'center', color: 'text.secondary' }} /></ListItem>}
              {cart.map(item => (
                  <ListItem key={item._id} disablePadding sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
                      secondaryAction={<IconButton size="small" onClick={() => handleRemoveFromCart(item._id)}><Delete color="error" /></IconButton>}
                  >
                      <ListItemText primary={<Typography sx={{ fontWeight: 500 }}>{item.name}</Typography>} secondary={`₹${item.price.toFixed(2)}`} />
                       <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                          <IconButton size="small" onClick={() => handleQuantityChange(item._id, -1)} disabled={item.quantity <= 1}><RemoveCircleOutline fontSize="small" /></IconButton>
                          <Typography sx={{ mx: 1, fontWeight: 'bold' }}>{item.quantity}</Typography>
                          <IconButton size="small" onClick={() => handleQuantityChange(item._id, 1)} disabled={item.quantity >= item.stock}><AddCircleOutline fontSize="small" /></IconButton>
                      </Box>
                  </ListItem>
              ))}
          </List>
          <Box sx={{ flexShrink: 0, pt: 2 }}>
              <Divider sx={{ mb: 2 }}/>
              <Box><Box display="flex" justifyContent="space-between" mb={1}><Typography color="text.secondary">Subtotal:</Typography><Typography sx={{ fontWeight: 500 }}>₹{subTotal.toFixed(2)}</Typography></Box><Box display="flex" justifyContent="space-between" alignItems="center"><Typography variant="h6" sx={{ fontWeight: 'bold' }}>GRAND TOTAL:</Typography><Typography variant="h5" sx={{ fontWeight: 'bold' }}>₹{subTotal.toFixed(2)}</Typography></Box></Box>
              <Button fullWidth variant="contained" color="success" size="large" sx={{ py: 1.5, mt: 3, fontSize: '1rem', fontWeight: 'bold' }} disabled={cart.length === 0} onClick={handleSubmitSale}>Complete Sale</Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default SalesPage;