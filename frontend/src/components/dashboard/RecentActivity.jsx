// src/components/dashboard/RecentActivity.jsx

import React from 'react';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, Button, Skeleton } from '@mui/material';

// Placeholder data
const activities = [
  { product: 'Milk', category: 'Dairy', price: '$2.50' },
  { product: 'Bread', category: 'Bakery', price: '$3.00' },
  { product: 'Eggs', category: 'Dairy', price: '$4.20' },
  { product: 'Apples', category: 'Produce', price: '$1.50' },
];

const RecentActivity = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Recent activity</Typography>

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary', mb: 1, px: 2 }}>
          <Typography variant="body2" sx={{ width: '40%', fontWeight: 500 }}>Product</Typography>
          <Typography variant="body2" sx={{ width: '30%', fontWeight: 500 }}>Category</Typography>
          <Typography variant="body2" sx={{ width: '30%', fontWeight: 500, textAlign: 'right' }}>Price</Typography>
        </Box>

        {/* List of Activities */}
        <List disablePadding>
          {activities.map((activity, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 1.5 }}>
              <Typography variant="body2" sx={{ width: '40%' }}>{activity.product}</Typography>
              <Typography variant="body2" sx={{ width: '30%', color: 'text.secondary' }}>{activity.category}</Typography>
              <Typography variant="body2" sx={{ width: '30%', fontWeight: 'bold', textAlign: 'right' }}>{activity.price}</Typography>
            </ListItem>
          ))}
          {/* Skeleton Loaders to match the image */}
           <ListItem disablePadding>
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="30%" sx={{ mx: 2 }} />
              <Skeleton variant="text" width="30%" />
           </ListItem>
        </List>

        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Button variant="contained" color="primary" size="small">View All</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;