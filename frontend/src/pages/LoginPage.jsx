import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Alert 
} from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", { email, password });
      const { user, token } = response.data;
      
      login(user, token); 

      // === UPDATED ROLE-BASED REDIRECTION ===
      if (user) {
        switch (user.role) {
          case 'Admin':
            navigate('/admin/dashboard');
            break;
          case 'Supplier':
            navigate('/supplier/orders');
            break;
          default: // For 'Shop Owner' and any other roles
            navigate('/dashboard');
            break;
        }
      }
      
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <Box className="flex items-center justify-center min-h-screen bg-[#f1f3f6]">
      <Container maxWidth="xs">
        <Card>
          <CardContent className="p-8">
            <Typography variant="h4" component="h1" className="text-center font-bold mb-6">
              Welcome Back
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <TextField
                label="Email Address"
                variant="outlined"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                className="py-3 font-bold"
              >
                Sign In
              </Button>
            </form>
            <Typography className="text-center mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline font-semibold">
                Sign Up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;