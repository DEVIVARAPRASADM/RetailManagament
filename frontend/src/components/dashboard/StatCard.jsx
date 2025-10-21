// src/components/dashboard/StatCard.jsx

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const StatCard = ({ title, value, icon, color = '#1a73e8' }) => {
  return (
    <Card elevation={2} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box 
            sx={{ 
              width: 50, 
              height: 50, 
              borderRadius: '50%', 
              bgcolor: color + '20', // Add transparency to the color
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: color
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography sx={{ color: 'text.secondary' }}>{title}</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{value}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;