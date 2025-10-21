import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const categories = ["Electronics", "Apparel", "Groceries", "Home Goods"];

const ProductModal = ({ open, onClose, onSave, productToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0],
    price: '',
    stock: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        category: productToEdit.category,
        price: productToEdit.price,
        stock: productToEdit.stock,
      });
      if (productToEdit.image_url) {
        setImagePreview(`http://localhost:5001/${productToEdit.image_url}`);
      }
    } else {
      setFormData({ name: '', category: categories[0], price: '', stock: '' });
      setImageFile(null);
      setImagePreview('');
    }
  }, [productToEdit, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productFormData = new FormData();
    Object.keys(formData).forEach(key => {
      productFormData.append(key, formData[key]);
    });
    if (imageFile) {
      productFormData.append('image', imageFile);
    }

    // --- THIS IS THE CRITICAL FIX ---
    // We get the ID from the 'productToEdit' prop that was passed in.
    // If it exists, we are in "edit mode". If it's null, we are in "add mode".
    const productId = productToEdit ? productToEdit._id : null;

    // We now pass this ID back to the onSave function in the parent component.
    onSave(productFormData, productId);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{productToEdit ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField name="name" label="Product Name" value={formData.name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  name="category"
                  value={formData.category}
                  label="Category"
                  onChange={handleChange}
                >
                  {categories.map((cat) => ( <MenuItem key={cat} value={cat}>{cat}</MenuItem> ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="price" label="Price" type="number" value={formData.price} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="stock" label="Stock" type="number" value={formData.stock} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload Image
                <input type="file" hidden onChange={handleImageChange} accept="image/*" />
              </Button>
              {imagePreview && ( <Box mt={2}><img src={imagePreview} alt="Preview" height="100" /></Box> )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductModal;