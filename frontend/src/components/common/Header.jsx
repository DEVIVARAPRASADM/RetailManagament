
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext'; // <-- 1. Import the useAuth hook

const Header = () => {
  const { user } = useAuth(); // <-- 2. Get the logged-in user's data
    console.log("Data available in Header component:", user);

  // If there's no user data yet (e.g., page is loading), don't render anything
  if (!user) {
    return null;
  }

  // 3. Use the user data in your JSX
  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        borderRadius: 3, 
        m: 2, 
        mt: 3,
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
