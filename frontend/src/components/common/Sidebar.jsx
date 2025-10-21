// src/components/common/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { Dashboard, Inventory, ShoppingCart, BarChart } from '@mui/icons-material';

const navItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Inventory', icon: <Inventory />, path: '/inventory' },
  { text: 'Orders', icon: <ShoppingCart />, path: '/orders' },
  { text: 'Analytics', icon: <BarChart />, path: '/analytics' },
];

const Sidebar = ({ width }) => {
  const activeLinkStyle = {
    backgroundColor: '#EEF2FF', // A light indigo background to match the image
    color: '#5E5FEF',          // The primary color
    '& .MuiListItemIcon-root': {
      color: '#5E5FEF',      // The primary color for the icon
    },
    '&:hover': {
      backgroundColor: '#E0E7FF',
    }
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
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 110 }}>
         <Typography variant="h5" className="font-extrabold text-slate-800">
          Retail<span className="text-blue-600">Sense</span>
        </Typography>
      </Box>
      <List sx={{ px: 2 }}>
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
    </Drawer>
  );
};

export default Sidebar;