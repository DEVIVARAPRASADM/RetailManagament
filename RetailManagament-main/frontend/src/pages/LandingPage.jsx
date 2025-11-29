// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  CardMedia,
  Paper,
  Divider
} from '@mui/material';
import { 
  Inventory2, 
  TrendingUp, 
  LocalShipping, 
  Assessment, 
  Notifications, 
  ShoppingCart,
  Store,
  Security,
  Speed,
  SupportAgent,
  VerifiedUser
} from '@mui/icons-material';


/* ===========================================
   NAVBAR
=========================================== */
const Navbar = () => (
  <AppBar position="sticky" sx={{ bgcolor: '#ffffff', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
    <Container maxWidth="xl">
      <Toolbar sx={{ height: 70, justifyContent: 'space-between' }}>
        
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Store sx={{ fontSize: 34, color: '#1976d2' }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2', letterSpacing: '-0.5px' }}>
            RetailConnect
          </Typography>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/login"
            sx={{
              fontWeight: 600, color: '#1976d2', textTransform: 'none',
              fontSize: '15px', '&:hover': { bgcolor: '#f5f5f5' },
            }}
          >
            Login
          </Button>

          <Button component={Link} to="/register" variant="contained"
            sx={{
              fontWeight: 600, bgcolor: '#1976d2', textTransform: 'none',
              fontSize: '15px', px: 3, borderRadius: 1,
              '&:hover': { bgcolor: '#1565c0' },
            }}
          >
            Register Now
          </Button>
        </Box>

      </Toolbar>
    </Container>
  </AppBar>
);



/* ===========================================
   HERO SECTION
=========================================== */
const HeroSection = () => (
  <Box
    sx={{
      bgcolor: "#1976d2",
      py: { xs: 8, md: 12 },
      minHeight: "90vh",
      display: "flex",
      alignItems: "center",
      color: "white",
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={6} alignItems="center" justifyContent="space-between">

        {/* LEFT CONTENT */}
        <Grid item xs={12} md={6}>
          <Typography sx={{ fontSize: { xs: "2.2rem", md: "3.2rem" }, fontWeight: 800, lineHeight: 1.2, mb: 3 }}>
            Smarter Inventory  
            <br /> For Modern Retailers
          </Typography>

          <Typography sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, color: "rgba(255,255,255,0.85)", maxWidth: 520, mb: 4 }}>
            Automate your stock management, forecast demand with AI,
            and manage your entire business from a clean dashboard.
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button component={Link} to="/register" variant="contained"
              sx={{
                bgcolor: "white", color: "#1976d2", fontWeight: 700,
                px: 4, py: 1.3, fontSize: "1rem", borderRadius: 2,
                "&:hover": { bgcolor: "#e6eefc" },
              }}
            >
              Get Started
            </Button>

            <Button variant="outlined"
              sx={{
                borderColor: "white", color: "white", px: 4, py: 1.3,
                fontWeight: 600, borderRadius: 2, fontSize: "1rem",
                "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Grid>

        {/* HERO IMAGE */}
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box
            component="img"
            src="/images/banner.png"
            alt="Dashboard Preview"
            sx={{
              width: "100%",
              maxWidth: 520,
              borderRadius: 3,
              boxShadow: "0px 20px 40px rgba(0,0,0,0.25)",
            }}
          />
        </Grid>

      </Grid>
    </Container>
  </Box>
);



/* ===========================================
   STEP CARD
=========================================== */
const StepCard = ({ number, title, description, bgColor }) => (
  <Box
    sx={{
      textAlign: "center",
      p: 3,
      borderRadius: 3,
      bgcolor: bgColor,
      border: "1px solid #e5e7eb",
      transition: "0.3s ease",
      "&:hover": { transform: "translateY(-4px)", boxShadow: "0 6px 18px rgba(0,0,0,0.1)" }
    }}
  >
    
    <Box
      sx={{
        width: 70, height: 70, bgcolor: "white",
        borderRadius: "50%", mx: "auto", mb: 2,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "3px solid rgba(13,71,161,0.2)",
        fontSize: "1.8rem", fontWeight: 700, color: "#0d47a1"
      }}
    >
      {number}
    </Box>

    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
    <Typography sx={{ color: "#475569", fontSize: "0.95rem" }}>{description}</Typography>
  </Box>
);



/* ===========================================
   STEPS SECTION (3 cards, one row)
=========================================== */
const StepsSection = () => {
  const steps = [
    {
      number: 1,
      title: "Quick Sign-Up",
      description: "Sign up with mobile number, business name and pin code.",
      bgColor: "#e8f2ff",
    },
    {
      number: 2,
      title: "Order & Manage",
      description: "Order at best prices and manage everything from one dashboard.",
      bgColor: "#e8fff0",
    },
    {
      number: 3,
      title: "Grow & Scale Faster",
      description: "Increase revenue with insights, fast restocking and smart tools.",
      bgColor: "#fff3ea",
    },
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "white" }}>
      <Container maxWidth="lg">

        <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 800, mb: 5 }}>
          Get Started in Under 10 Minutes
        </Typography>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{
            flexWrap: "nowrap",
            overflowX: "auto",
            pb: 1,
          }}
        >
          {steps.map((step, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={4}
              md={4}
              sx={{ minWidth: { xs: "300px", sm: "auto" } }}
            >
              <StepCard {...step} />
            </Grid>
          ))}
        </Grid>
                  <Box sx={{ textAlign: "center", mb: 4 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1976d2",
              color: "white",
              fontWeight: 700,
              px: 5,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.1rem",
              "&:hover": { bgcolor: "#1259a5" }
            }}
          >
            Register Today!
          </Button>
        </Box>
      </Container>
    </Box>
  );
};



/* ===========================================
   CATEGORY SECTION
=========================================== */
const CategorySection = () => {
  const categories = [
    {
      title: "Food & FMCG",
      desc: "Premium staples, snacks, beverages & daily essentials from trusted brands",
      image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
    },
    {
      title: "Healthcare & Pharma",
      desc: "Genuine medicines, wellness products & medical supplies with fast delivery",
      image: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
    }
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: "#e9f7f5" }}>
      <Container maxWidth="lg">

        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: 800,
            color: "#1a1a1a",
            mb: 6,
          }}
        >
          Retail Connect powers every step of your business growth journey
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {categories.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ textAlign: "center" }}>
                
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 3,
                    bgcolor: "#dff3ee",
                    p: 3,
                    objectFit: "contain",
                    mx: "auto",
                    mb: 2,
                  }}
                />

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#475569",
                    fontSize: "0.95rem",
                    maxWidth: 380,
                    mx: "auto",
                  }}
                >
                  {item.desc}
                </Typography>

              </Box>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};


/* ===========================================
   TRUST SECTION
=========================================== */
const TrustSection = () => (
  <Box sx={{ py: 12, bgcolor: "#f8fafc" }}>
    <Container maxWidth="lg">

      <Typography variant="h3" sx={{ fontWeight: 800, textAlign: "center", mb: 6 }}>
        Why Retailers Trust RetailConnect
      </Typography>

      <Grid container spacing={5} justifyContent="center">
        {[
          { icon: VerifiedUser, label: "Verified Suppliers", color: "#1976d2", bg: "#e3f2fd" },
          { icon: Security, label: "Secure Payments", color: "#2e7d32", bg: "#e8f5e9" },
          { icon: Speed, label: "Fast Delivery", color: "#ed6c02", bg: "#fff3e0" },
          { icon: SupportAgent, label: "24/7 Support", color: "#9c27b0", bg: "#f3e5f5" },
        ].map((item, index) => (
          <Grid key={index} item xs={6} md={3} sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ textAlign: "center" }}>
              <Box sx={{
                bgcolor: item.bg, width: 90, height: 90, borderRadius: 3,
                display: "flex", alignItems: "center", justifyContent: "center",
                mx: "auto", mb: 2
              }}>
                <item.icon sx={{ fontSize: 42, color: item.color }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

    </Container>
  </Box>
);



/* ===========================================
   CTA BANNER
=========================================== */
const CtaBanner = () => (
  <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#1976d2' }}>
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center' }}>
        
        <Typography variant="h3" sx={{ fontWeight: 800, color: 'white', mb: 2 }}>
          Ready to Transform Your Retail Business?
        </Typography>

        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4 }}>
          Join thousands of retailers already growing with RetailConnect
        </Typography>

        <Button 
          component={Link} to="/register" 
          variant="contained" size="large"
          sx={{ 
            bgcolor: 'white', color: '#1976d2', fontWeight: 700,
            px: 5, py: 2, borderRadius: 1, textTransform: 'none',
            '&:hover': { bgcolor: '#f5f5f5' }
          }}
        >
          Get Started for Free
        </Button>

      </Box>
    </Container>
  </Box>
);



/* ===========================================
   FOOTER
=========================================== */
const Footer = () => (
  <Box sx={{ bgcolor: '#1a202c', color: 'white', py: 8 }}>
    <Container maxWidth="lg">

      <Grid container spacing={4}>
        
        {/* About */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Store sx={{ fontSize: 32 }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              RetailConnect
            </Typography>
          </Box>
          <Typography sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
            Empowering small retailers across India with technology-driven 
            solutions for inventory management and supplier connections.
          </Typography>
        </Grid>

        {/* Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Company</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>About Us</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Careers</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Contact</Typography>
          </Box>
        </Grid>

        <Grid item xs={6} md={2}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Products</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Features</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Pricing</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Enterprise</Typography>
          </Box>
        </Grid>

        <Grid item xs={6} md={2}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Resources</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Blog</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Help Center</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Community</Typography>
          </Box>
        </Grid>

        <Grid item xs={6} md={2}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Legal</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Privacy</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Terms</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Security</Typography>
          </Box>
        </Grid>

      </Grid>

      <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
      <Typography sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
        © 2024 RetailConnect. All rights reserved.
      </Typography>

    </Container>
  </Box>
);



/* ===========================================
   MAIN PAGE EXPORT
=========================================== */
const LandingPage = () => {
  return (
    <Box>
      <Navbar />
      <main>
        <HeroSection />
        <StepsSection />
        <CategorySection />
        <TrustSection />
        <CtaBanner />
      </main>
      <Footer />
    </Box>
  );
};

export default LandingPage;
