import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import {
  Container, Card, CardContent, Typography, TextField, Button, Box, Grid,
  MenuItem, Select, InputLabel, FormControl, IconButton, InputAdornment, Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "Shop Owner", 
    business_name: "",
    business_license: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");

  // --- Using your handleChange function ---
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- Using your handleSubmit function with the axios call ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error on new submission

    try {
      // The API endpoint from your code
      const response = await axios.post("http://localhost:5001/api/auth/register", form);
      // The success handling from your code
      alert("Registered successfully! Please wait for admin verification.");
      navigate("/login");
    } catch (err) {
      // The error handling from your code
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Box className="flex items-center justify-center min-h-screen bg-[#f1f3f6] py-12">
      <Container maxWidth="md">
        <Card>
          <CardContent className="p-8">
            <Typography variant="h4" component="h1" className="text-center font-bold mb-2">
              Create Your RetailSense Account
            </Typography>
            <Typography className="text-center text-gray-600 mb-8">
              Fill in the details below to get started.
            </Typography>
            
            {/* --- Displaying the error message using MUI Alert --- */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={3}>
                
                {/* Section 1: User Credentials */}
                <Grid item xs={12} sm={6}>
                  <TextField name="username" label="Username" fullWidth required value={form.username} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="email" label="Email Address" type="email" fullWidth required value={form.email} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    required
                    value={form.password}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="role-select-label">I am a...</InputLabel>
                    <Select
                      labelId="role-select-label"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      label="I am a..."
                    >
                      <MenuItem value="Shop Owner">Shop Owner / Retailer</MenuItem>
                      <MenuItem value="Supplier">Supplier</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Section 2: Business Information */}
                <Grid item xs={12}>
                  <Typography variant="h6" className="mt-4 mb-2 font-semibold">Business Details</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="business_name" label="Business Name" fullWidth required value={form.business_name} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="business_license" label="Business License Number" fullWidth required value={form.business_license} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="phone" label="Phone Number" fullWidth required value={form.phone} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="address" label="Business Address" fullWidth required multiline rows={3} value={form.address} onChange={handleChange} />
                </Grid>

                {/* Submission */}
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth size="large" className="py-3 mt-4 font-bold">
                    Create Account
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Typography className="text-center mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-semibold">
                Sign In
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default RegisterPage;