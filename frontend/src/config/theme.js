// src/config/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6200ea', // Fioletowy
      light: '#9d46ff',
      dark: '#0a00b6',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00bcd4', // Turkusowy
      light: '#62efff',
      dark: '#008ba3',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ff1744', // Jaskrawy czerwony
    },
    warning: {
      main: '#ffab00', // Jaskrawy pomarańczowy
    },
    info: {
      main: '#2979ff', // Jaskrawy niebieski
    },
    success: {
      main: '#00e676', // Jaskrawy zielony
    },
    background: {
      default: '#f0f7ff', // Jasnoniebieskie tło
      paper: '#ffffff',   // Białe tło dla kart
    },
    text: {
      primary: '#37474f',
      secondary: '#546e7a',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
    action: {
      active: 'rgba(98, 0, 234, 0.7)',
      hover: 'rgba(98, 0, 234, 0.08)',
      selected: 'rgba(98, 0, 234, 0.16)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
    // Dodatkowe kolory dla akcentów
    accent1: {
      main: '#ff4081', // Różowy
      light: '#ff79b0',
      dark: '#c60055',
    },
    accent2: {
      main: '#00bfa5', // Turkusowy
      light: '#5df2d6',
      dark: '#008e76',
    },
    accent3: {
      main: '#ff6d00', // Pomarańczowy
      light: '#ff9e40',
      dark: '#c43c00',
    }
  },
  typography: {
    fontFamily: [
      'Open Sans',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '32px',
      fontWeight: 500,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 500,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 500,
    },
    h4: {
      fontSize: '18px',
      fontWeight: 500,
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 0, // Usunięcie zaokrągleń
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0',
          padding: '8px 16px',
          background: 'linear-gradient(45deg, #6200ea 30%, #9d46ff 90%)',
          '&.MuiButton-containedSecondary': {
            background: 'linear-gradient(45deg, #00bcd4 30%, #62efff 90%)',
          },
          '&.MuiButton-outlined': {
            background: 'transparent',
          },
          '&.MuiButton-text': {
            background: 'transparent',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0',
          boxShadow: '0 4px 20px rgba(98, 0, 234, 0.15)',
          background: '#ffffff',
          borderTop: '3px solid #6200ea',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 6px 25px rgba(98, 0, 234, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: '0',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '0',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6200ea',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#6200ea',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #6200ea 0%, #9d46ff 100%)',
          boxShadow: '0 4px 20px rgba(98, 0, 234, 0.15)',
          color: '#ffffff',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(98, 0, 234, 0.08)',
            borderLeft: '4px solid #6200ea',
          },
          '&:hover': {
            backgroundColor: 'rgba(98, 0, 234, 0.04)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        },
        head: {
          fontWeight: 600,
          backgroundColor: 'rgba(98, 0, 234, 0.05)',
          color: '#37474f',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '0',
          '&.MuiChip-colorPrimary': {
            background: 'linear-gradient(45deg, #6200ea 30%, #9d46ff 90%)',
          },
          '&.MuiChip-colorSecondary': {
            background: 'linear-gradient(45deg, #00bcd4 30%, #62efff 90%)',
          },
          '&.MuiChip-colorSuccess': {
            background: 'linear-gradient(45deg, #00e676 30%, #69f0ae 90%)',
          },
          '&.MuiChip-colorError': {
            background: 'linear-gradient(45deg, #ff1744 30%, #ff5252 90%)',
          },
          '&.MuiChip-colorWarning': {
            background: 'linear-gradient(45deg, #ffab00 30%, #ffd740 90%)',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: '0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          borderTop: '3px solid #6200ea',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '0',
          borderLeft: '3px solid currentColor',
        },
        standardSuccess: {
          backgroundColor: 'rgba(0, 230, 118, 0.1)',
        },
        standardError: {
          backgroundColor: 'rgba(255, 23, 68, 0.1)',
        },
        standardWarning: {
          backgroundColor: 'rgba(255, 171, 0, 0.1)',
        },
        standardInfo: {
          backgroundColor: 'rgba(41, 121, 255, 0.1)',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          borderRadius: '0',
        },
      },
    },
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
    '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
    '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
    '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
    '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
    '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
    '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
    '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
    '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
    '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
    '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
    '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
    '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
  ],
});

export default theme;
