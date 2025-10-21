// src/pages/LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardMedia, TextField, InputAdornment, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';

const Navbar = () => (
  <AppBar position="sticky" color="default" elevation={0} className="bg-white border-b border-gray-200">
    <Container maxWidth="xl">
      <Toolbar className="flex justify-between h-16">
        <Box className="flex items-center gap-4">
            <Typography variant="h6" className="font-bold text-blue-600 tracking-tighter">
              RetailSense
            </Typography>
            <Typography className="text-sm font-semibold text-gray-500 border-l pl-4">
                Powering Smart Retail
            </Typography>
        </Box>
        <div>
          <Button component={Link} to="/login" variant="outlined" color="primary" className="font-bold mx-2">
            Login
          </Button>
          <Button component={Link} to="/register" variant="contained" color="primary" className="font-bold">
            Register
          </Button>
        </div>
      </Toolbar>
    </Container>
  </AppBar>
);

const HeroSection = () => (
  <Box className="bg-white py-12 md:py-16 text-center">
    <Container maxWidth="md">
        <Box
            component="img"
            src="https://img.icons8.com/plasticine/100/total-sales.png"
            alt="RetailSense Logo"
            className="mx-auto h-24 w-24 mb-4"
        />
        <Typography variant="h3" component="h1" className="font-bold text-gray-800">
            One Platform to Manage Your Entire Retail Business
        </Typography>
        <Typography variant="h6" className="text-gray-600 mt-4 mb-8">
            Buy smarter. Sell faster. Grow your business.
        </Typography>
        <TextField
            variant="outlined"
            placeholder="Search for products, suppliers or reports..."
            fullWidth
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <Search className="text-gray-500" />
                </InputAdornment>
                ),
                className: "bg-white rounded-full text-lg p-2"
            }}
        />
    </Container>
  </Box>
);

const CategoryCard = ({ title, image }) => (
    <Grid item xs={6} sm={4} md={3} lg={2}>
        <Card className="h-full group hover:shadow-2xl transition-shadow">
            <CardMedia
                component="img"
                image={image}
                alt={title}
                className="h-32 object-cover group-hover:scale-105 transition-transform"
            />
            <Box className="p-3 text-center">
                <Typography className="font-bold text-gray-800">{title}</Typography>
            </Box>
        </Card>
    </Grid>
);

const FeaturesGridSection = () => (
  <Box className="py-12 bg-[#f1f3f6]">
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <CategoryCard title="AI Forecasting" image="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600" />
        <CategoryCard title="Automated Orders" image="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600" />
        <CategoryCard title="Inventory Mgt." image="https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=600" />
        <CategoryCard title="Sales Analytics" image="https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=600" />
        <CategoryCard title="Supplier Mgt." image="https://images.pexels.com/photos/7648325/pexels-photo-7648325.jpeg?auto=compress&cs=tinysrgb&w=600" />
        <CategoryCard title="Low Stock Alerts" image="https://images.pexels.com/photos/6238120/pexels-photo-6238120.jpeg?auto=compress&cs=tinysrgb&w=600" />
      </Grid>
    </Container>
  </Box>
);

const CtaBanner = () => (
    <Box className="py-12 bg-white">
        <Container maxWidth="lg">
            <Paper className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 flex justify-between items-center">
                <Box>
                    <Typography variant="h4" className="font-bold">Ready to Grow Your Business?</Typography>
                    <Typography className="text-blue-100 mt-1">Create an account to start managing your inventory intelligently.</Typography>
                </Box>
                <Button component={Link} to="/register" variant="contained"
                    className="bg-orange-500 hover:bg-orange-600 font-bold text-white text-lg px-8 py-3">
                    Register Now
                </Button>
            </Paper>
        </Container>
    </Box>
);

const LandingPage = () => {
  return (
    <Box>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesGridSection />
        <CtaBanner />
      </main>
    </Box>
  );
};

export default LandingPage;