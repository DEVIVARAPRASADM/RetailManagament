// src/components/dashboard/RecentActivity.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Skeleton,
  Box,
} from "@mui/material";

const RecentActivity = ({ activities, loading }) => {
  return (
    <Card
      sx={{
        width: "500",
        height: "100%",
        boxShadow: 3,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fafbff",
      }}
    >
      <CardContent sx={{ flex: 1, pb: 0 }}>
        {/* Header */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: "#1e1e2f",
          }}
        >
          Recent Activity
        </Typography>

        {/* Table */}
        <TableContainer sx={{ borderRadius: 2 }}>
          <Table size="small" sx={{ minWidth: "100%" }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#f4f6fb",
                  "& th": {
                    fontWeight: 600,
                    color: "#555",
                    fontSize: "0.9rem",
                    borderBottom: "2px solid #e0e0e0",
                  },
                }}
              >
                <TableCell>Product</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={3}>
                      <Skeleton width="100%" height={30} />
                    </TableCell>
                  </TableRow>
                ))
              ) : activities.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    align="center"
                    sx={{ color: "gray", py: 3 }}
                  >
                    No recent sales activity
                  </TableCell>
                </TableRow>
              ) : (
                activities.slice(0, 6).map((activity) => (
                  <TableRow
                    key={activity._id}
                    sx={{
                      "&:last-child td, &:last-child th": { borderBottom: 0 },
                    }}
                  >
                    <TableCell
                      sx={{
                        fontWeight: 500,
                        color: "#1e1e2f",
                        fontSize: "0.9rem",
                      }}
                    >
                      {activity.productId
                        ? activity.productId.name
                        : "Unknown Product"}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.9rem",
                      }}
                    >
                      {activity.productId?.category || "—"}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 600,
                        color: "#1e1e2f",
                        fontSize: "0.9rem",
                      }}
                    >
                      ${activity.totalAmount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      {/* View All Button */}
      <Box
        sx={{
          mt: "auto",
          textAlign: "right",
          px: 2,
          py: 1.5,
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            textTransform: "none",
            borderRadius: "20px",
            px: 3,
            fontWeight: 600,
            boxShadow: "none",
          }}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
};

export default RecentActivity;
