
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext'; 

const Header = () => {
  const { user } = useAuth(); 
    console.log("Data available in Header component:", user);

  if (!user) {
    return null;
  }

  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        borderRadius: 3,
        ml:3,mr:3, 
        width: 'auto'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
        {user.business_name || "Business Name"}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            {/* <Notifications /> */}
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>{user.username}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.2 }}>{user.role}</Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
