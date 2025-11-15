// src/components/dashboard/StatCard.jsx

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const StatCard = ({ title, value, icon, color = '#1a73e8' }) => {
  return (
    // Only set standard MUI elevation and border-radius for clean look
    <Card elevation={2} sx={{ borderRadius: 3 }}>
      {/* Visual Alignment: Ensure padding inside the card is consistent, slightly higher 
          than default to give breathing room and fill more space horizontally/vertically. */}
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}> 
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* ICON BLOCK: Fixed size to keep layout consistent. flexShrink: 0 is important to not let it get compressed. */}
          <Box 
            sx={{ 
              width: 50, 
              height: 50, 
              flexShrink: 0,
              borderRadius: '50%', 
              bgcolor: color + '20', // Add transparency
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: color
            }}
          >
            {icon}
          </Box>
          {/* TEXT BLOCK: Let it take the remaining space. flexGrow: 1. */}
          <Box sx={{ flexGrow: 1 }}> 
            <Typography sx={{ color: 'text.secondary' }}>{title}</Typography>
            {/* NO FONT SIZE CHANGE: Keeping the original h5 variant (or whichever the component was designed with if h5 was too small) */}
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{value}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;