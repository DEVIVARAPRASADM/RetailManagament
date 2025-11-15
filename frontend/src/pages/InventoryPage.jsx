// src/pages/InventoryPage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Avatar } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { fetchProducts, addProduct, editProduct, removeProduct } from '../services/productService';
import ProductModal from '../components/inventory/ProductModal'; 

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetchProducts();
      setProducts(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setProductToEdit(null);
    setIsModalOpen(false);
  };

  const handleSaveProduct = async (productData, id) => {
    try {
      if (id) {
        await editProduct(id, productData);
      } else {
        await addProduct(productData);
      }
      loadProducts();
      handleCloseModal();
    } catch (error) {
      console.error("Failed to save product", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await removeProduct(id);
        loadProducts();
      } catch (error) {
        console.error("Failed to delete product", error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Inventory Management</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
          Add New Product
        </Button>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={7}>Loading products...</TableCell></TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product._id} hover>
                    <TableCell>
                      <Avatar 
                        variant="rounded"
                        src={`http://localhost:5001/${product.image_url}`} 
                        alt={product.name}
                      />
                    </TableCell>
                    {/* --- FIX #1: Displaying the last 6 characters of the MongoDB _id for readability --- */}
                    <TableCell component="th" scope="row">
                      {product._id.slice(-6).toUpperCase()}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price ? product.price.toFixed(2) : '0.00'}</TableCell>
                    {/* --- FIX #2: Using the correct 'stock' property --- */}
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleOpenModal(product)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(product._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <ProductModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />
    </Box>
  );
};

export default InventoryPage;