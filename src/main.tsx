import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import AppThemeProvider from './theme/AppThemeProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { NuqsAdapter } from 'nuqs/adapters/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <NuqsAdapter>
          <App />
        </NuqsAdapter>
      </LocalizationProvider>
    </AppThemeProvider>
  </StrictMode>
);
