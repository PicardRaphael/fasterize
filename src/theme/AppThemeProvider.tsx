import {
  CssBaseline,
  GlobalStyles,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';

const basePalette = {
  primary: {
    main: '#0b2840',
  },
  secondary: {
    main: '#8dc63f',
  },
  background: {
    default: '#f5f6f8',
    paper: '#ffffff',
  },
  success: {
    main: '#8dc63f',
    contrastText: '#ffffff',
  },
  text: {
    primary: '#1f2933',
    secondary: '#64748b',
  },
};

export const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: basePalette,
        shape: {
          borderRadius: 18,
        },
        typography: {
          fontFamily: 'Inter, Helvetica, Arial, sans-serif',
          h1: { fontSize: '1.75rem', fontWeight: 600 },
          h2: { fontSize: '1.5rem', fontWeight: 600 },
          subtitle1: { fontSize: '1rem', fontWeight: 600 },
          body1: { fontSize: '0.95rem', fontWeight: 500 },
          body2: { fontSize: '0.85rem', color: '#64748b' },
          button: { textTransform: 'none', fontWeight: 600 },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 24,
              },
            },
          },
          MuiButtonBase: {
            defaultProps: {
              disableRipple: true,
            },
          },
        },
      }),
    [],
  );

  return (
    <StyledEngineProvider injectFirst enableCssLayer>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default AppThemeProvider;
