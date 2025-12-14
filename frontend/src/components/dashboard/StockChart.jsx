// src/components/dashboard/StockChart.jsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', stock: 4000 },
  { name: 'Tue', stock: 3000 },
  { name: 'Wed', stock: 2000 },
  { name: 'Thu', stock: 2780 },
  { name: 'Fri', stock: 1890 },
  { name: 'Sat', stock: 2390 },
  { name: 'Sun', stock: 3490 },
];

const StockChart = () => {
  return (
    <Card elevation={2} sx={{ borderRadius: 3, height: '100%' }}>
      {/* <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Stock</Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" fill="#1a73e8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent> */}
    </Card>
  );
};

export default StockChart;