import { createTheme, Theme } from '@mui/material/styles'

export function getTheme(mode: 'light' | 'dark'): Theme {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: '#0288d1',
        light: '#4fc3f7',
        dark: '#01579b',
      },
      background: {
        default: mode === 'dark' ? '#0a1929' : '#f0f4f8',
        paper: mode === 'dark' ? '#0d2137' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#e3f2fd' : '#1a2027',
        secondary: mode === 'dark' ? '#90caf9' : '#4a5568',
      },
    },
    typography: {
      fontFamily: 'Inter, Roboto, sans-serif',
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backdropFilter: 'blur(10px)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
    },
  })
}
