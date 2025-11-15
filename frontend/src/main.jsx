// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import App from './App.jsx';
import './assets/styles/index.css';
import { AuthProvider } from './context/AuthContext';

// --- Replace your existing theme with this one ---
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5E5FEF', // A softer, more modern Indigo/Blue from the image
    },
    background: {
      default: '#f8fafc', // A very light, clean background (slate-50)
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',   // slate-800
      secondary: '#64748b', // slate-500
    },
  },
  typography: {
    fontFamily: '"Inter", "sans-serif"',
    fontWeightBold: 700,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', // A softer shadow
          border: '1px solid #e2e8f0', // slate-200 border
        }
      }
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
