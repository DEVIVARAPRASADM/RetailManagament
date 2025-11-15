// src/components/common/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { Dashboard, Inventory, ShoppingCart, BarChart, Logout as LogoutIcon } from '@mui/icons-material'; // Imported Logout Icon

import { useAuth } from '../../context/AuthContext'; 

const navItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Inventory', icon: <Inventory />, path: '/inventory' },
  { text: 'Orders', icon: <ShoppingCart />, path: '/orders' },
  { text: 'Sales', icon: <BarChart />, path: '/sales' },
];

const Sidebar = ({ width }) => {
  const { logout } = useAuth();
  const navigate = useNavigate(); 

  const activeLinkStyle = {
    backgroundColor: '#EEF2FF', 
    color: '#5E5FEF',         
    '& .MuiListItemIcon-root': {
      color: '#5E5FEF', 
    },
    '&:hover': {
      backgroundColor: '#E0E7FF',
    }
  };

  const handleLogout = () => {
      logout(); 
      navigate('/');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          borderRight: 'none',
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column', 
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 110 }}>
         <Typography variant="h5" className="font-extrabold text-slate-800">
          Retail<span className="text-blue-600">Connect</span>
        </Typography>
      </Box>
      
      {/* Mapped Navigation Links (Takes available space) */}
      <List sx={{ px: 2, flexGrow: 1 }}> 
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                borderRadius: 2,
                color: 'text.secondary', // Gray color for inactive links
                '& .MuiListItemIcon-root': {
                  color: 'text.secondary', // Gray color for inactive icons
                },
                '&.active': activeLinkStyle,
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontWeight: '600' }} primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <List sx={{ px: 2, pb: 2, mt: 'auto' }}> 
        <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                color: '#D32F2F', 
                '& .MuiListItemIcon-root': {
                  color: '#D32F2F',
                },
                '&:hover': {
                  backgroundColor: '#FFEBEE',
                },
              }}
            >
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontWeight: '600' }} primary="Logout" />
            </ListItemButton>
          </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;