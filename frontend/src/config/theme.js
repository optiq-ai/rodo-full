// src/config/theme.js - Zmiana motywu na seledynowy
import { createTheme } from '@mui/material/styles';

// Bazowy motyw (zmodyfikowany na seledynowy)
const baseTheme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#4ECDC4', // Seledynowy - Seafoam Green
      light: '#7EDFD9',
      dark: '#3AA99F',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2A9D8F', // Ciemniejszy seledynowy
      light: '#57C4B8',
      dark: '#1E7268',
      contrastText: '#ffffff',
    },
    error: {
      main: '#FF6B6B', // Łagodniejszy czerwony
    },
    warning: {
      main: '#FFD166', // Złoty żółty
    },
    info: {
      main: '#118AB2', // Niebieski
    },
    success: {
      main: '#06D6A0', // Jasny seledynowy
    },
    background: {
      default: '#F0FFF9', // Jasnoseledynowe tło
      paper: '#ffffff',   // Białe tło dla kart
    },
    text: {
      primary: '#37474F',
      secondary: '#546E7A',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
    action: {
      active: 'rgba(78, 205, 196, 0.7)',
      hover: 'rgba(78, 205, 196, 0.08)',
      selected: 'rgba(78, 205, 196, 0.16)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
    // Dodatkowe kolory dla akcentów
    accent1: {
      main: '#06D6A0', // Jasny seledynowy
      light: '#6EEFD0',
      dark: '#00A37A',
    },
    accent2: {
      main: '#118AB2', // Niebieski
      light: '#5EBAD6',
      dark: '#0A5D78',
    },
    accent3: {
      main: '#FFD166', // Złoty żółty
      light: '#FFE499',
      dark: '#D9A53B',
    }
  },
  typography: {
    // Text-Heavy Sites - Kreatywne wykorzystanie typografii
    fontFamily: [
      'Space Grotesk', // Nowoczesna czcionka z charakterem
      'Playfair Display', // Elegancka czcionka szeryfowa
      'Open Sans',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3.5rem', // Zwiększono rozmiar - Text-Heavy Sites
      fontWeight: 700,
      letterSpacing: '-0.02em',
      fontFamily: 'Playfair Display, serif',
    },
    h2: {
      fontSize: '2.8rem', // Zwiększono rozmiar - Text-Heavy Sites
      fontWeight: 600,
      letterSpacing: '-0.01em',
      fontFamily: 'Playfair Display, serif',
    },
    h3: {
      fontSize: '2.2rem', // Zwiększono rozmiar - Text-Heavy Sites
      fontWeight: 600,
      fontFamily: 'Space Grotesk, sans-serif',
    },
    h4: {
      fontSize: '1.8rem', // Zwiększono rozmiar - Text-Heavy Sites
      fontWeight: 600,
      fontFamily: 'Space Grotesk, sans-serif',
    },
    body1: {
      fontSize: '1.1rem', // Zwiększono rozmiar - Text-Heavy Sites
      fontWeight: 400,
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.95rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontFamily: 'Space Grotesk, sans-serif',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    // Intentional Imperfection - Nieregularne kształty
    borderRadius: '4px', // Podstawowy promień
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        /* Cursor Alternatives - Niestandardowy kursor */
        body {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%234ECDC4"><circle cx="12" cy="12" r="6" /></svg>') 12 12, auto !important;
        }
        
        /* Scrollytelling - Płynne przewijanie */
        html {
          scroll-behavior: smooth;
        }
        
        /* Micro Interactions - Subtelne animacje */
        * {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        /* Anti-Usability - Eksperymentalne interakcje */
        ::selection {
          background-color: #4ECDC4;
          color: white;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // Intentional Imperfection - Nieregularne kształty
          borderRadius: '2px 8px 2px 8px',
          padding: '10px 24px',
          // Bright and Bold Designs - Odważne kolory i gradienty
          background: 'linear-gradient(45deg, #4ECDC4 30%, #7EDFD9 90%)',
          position: 'relative',
          overflow: 'hidden',
          // Micro Interactions - Subtelne animacje
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'all 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
          '&.MuiButton-containedSecondary': {
            background: 'linear-gradient(45deg, #2A9D8F 30%, #57C4B8 90%)',
            color: '#ffffff',
          },
          '&.MuiButton-outlined': {
            background: 'transparent',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: '#4ECDC4',
            borderRadius: '8px 2px 8px 2px', // Intentional Imperfection - Odwrócony promień
            '&:hover': {
              borderWidth: '2px',
              transform: 'translateY(-3px)', // Micro Interactions - Animacja przy najechaniu
              boxShadow: '0 7px 14px rgba(78, 205, 196, 0.2)',
            },
          },
          '&.MuiButton-text': {
            background: 'transparent',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: 0,
              height: '2px',
              background: '#4ECDC4',
              transition: 'width 0.3s',
            },
            '&:hover::after': {
              width: '100%',
            },
          },
          // Micro Interactions - Animacja przy kliknięciu
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // Intentional Imperfection - Nieregularne kształty
          borderRadius: '16px 4px 16px 4px',
          // Bright and Bold Designs - Odważne kolory
          boxShadow: '0 10px 30px rgba(78, 205, 196, 0.15)',
          background: '#ffffff',
          borderTop: '3px solid #4ECDC4',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
          // Micro Interactions - Subtelne animacje
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            transform: 'translateY(-8px) rotate(0.5deg)', // Intentional Imperfection - Lekkie przekrzywienie
            boxShadow: '0 15px 35px rgba(78, 205, 196, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          // Intentional Imperfection - Nieregularne kształty
          borderRadius: '8px 2px 8px 2px',
          // Micro Interactions - Subtelne animacje
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
          '& .MuiOutlinedInput-root': {
            // Intentional Imperfection - Nieregularne kształty
            borderRadius: '8px 2px 8px 2px',
            // Micro Interactions - Subtelne animacje
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4ECDC4',
              borderWidth: '2px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4ECDC4',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#4ECDC4',
          },
          // Micro Interactions - Animacja przy wpisywaniu
          '& .MuiInputBase-input': {
            transition: 'background-color 0.3s',
          },
          '& .MuiInputBase-input:focus': {
            backgroundColor: 'rgba(78, 205, 196, 0.05)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          // Bright and Bold Designs - Odważne kolory i gradienty
          background: 'linear-gradient(90deg, #4ECDC4 0%, #7EDFD9 100%)',
          boxShadow: '0 4px 20px rgba(78, 205, 196, 0.15)',
          color: '#ffffff',
          // Intentional Imperfection - Nieregularne kształty
          borderRadius: '0 0 16px 0', // Zaokrąglenie tylko w prawym dolnym rogu
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          // Bright and Bold Designs - Subtelne gradienty
          background: 'linear-gradient(180deg, #F0FFF9 0%, #ffffff 100%)',
          borderRight: '1px solid rgba(78, 205, 196, 0.1)',
          // Intentional Imperfection - Nieregularne kształty
          borderTopRightRadius: '16px',
          borderBottomRightRadius: '16px',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          // Micro Interactions - Subtelne animacje
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          '&.Mui-selected': {
            backgroundColor: 'rgba(78, 205, 196, 0.08)',
            borderLeft: '4px solid #4ECDC4',
            // Intentional Imperfection - Asymetryczne podświetlenie
            borderRight: '2px solid transparent',
          },
          '&:hover': {
            backgroundColor: 'rgba(78, 205, 196, 0.04)',
            transform: 'translateX(4px)', // Micro Interactions - Przesunięcie przy najechaniu
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(78, 205, 196, 0.08)',
        },
        head: {
          fontWeight: 600,
          backgroundColor: 'rgba(78, 205, 196, 0.05)',
          color: '#37474F',
          // Text-Heavy Sites - Wyróżniająca się typografia
          fontFamily: 'Space Grotesk, sans-serif',
          letterSpacing: '0.02em',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          // Intentional Imperfection - Nieregularne kształty
          borderRadius: '12px 4px 12px 4px',
          // Micro Interactions - Subtelne animacje
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
          '&.MuiChip-colorPrimary': {
            background: 'linear-gradient(45deg, #4ECDC4 30%, #7EDFD9 90%)',
          },
          '&.MuiChip-colorSecondary': {
            background: 'linear-gradient(45deg, #2A9D8F 30%, #57C4B8 90%)',
          },
          '&.MuiChip-colorSuccess': {
            background: 'linear-gradient(45deg, #06D6A0 30%, #6EEFD0 90%)',
          },
          '&.MuiChip-colorError': {
            background: 'linear-gradient(45deg, #FF6B6B 30%, #FF9E9E 90%)',
          },
          '&.MuiChip-colorWarning': {
            background: 'linear-gradient(45deg, #FFD166 30%, #FFE499 90%)',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          // Intentional Imperfection - Nieregularne kształty
          borderRadius: '16px 4px 16px 4px',
          boxShadow: '0 10px 30px rgba(78, 205, 196, 0.15)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          // Intentional Imperfection - Nieregularne kształty
          borderRadius: '16px 4px 16px 4px',
          boxShadow: '0 15px 35px rgba(78, 205, 196, 0.2)',
          borderTop: '3px solid #4ECDC4',
          // Micro Interactions - Animacja przy otwieraniu
          animation: '$dialogFadeIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          // Intentional Imperfection - Nieregularne kształty
          borderRadius: '8px 2px 8px 2px',
          borderLeft: '4px solid currentColor',
        },
        standardSuccess: {
          backgroundColor: 'rgba(6, 214, 160, 0.1)',
        },
        standardError: {
          backgroundColor: 'rgba(255, 107, 107, 0.1)',
        },
        standardWarning: {
          backgroundColor: 'rgba(255, 209, 102, 0.1)',
        },
        standardInfo: {
          backgroundColor: 'rgba(17, 138, 178, 0.1)',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          // Intentional Imperfection - Nieregularne kształty
          borderRadius: '8px 2px 8px 2px',
        },
      },
    },
    // Dodatkowe style dla Scrollytelling i Navigation Beyond Up and Down
    MuiContainer: {
      styleOverrides: {
        root: {
          position: 'relative',
          // Scrollytelling - Płynne przewijanie
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
        },
      },
    },
  },
  // Dodatkowe animacje dla Micro Interactions
  transitions: {
    easing: {
      // Niestandardowe krzywe przejścia dla bardziej naturalnych animacji
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      // Dodatkowe krzywe dla bardziej wyrazistych animacji
      bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      smooth: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    },
  },
  // Customowe cienie dla Intentional Imperfection
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(78,205,196,0.2),0px 1px 1px 0px rgba(78,205,196,0.14),0px 1px 3px 0px rgba(78,205,196,0.12)',
    '0px 3px 1px -2px rgba(78,205,196,0.2),0px 2px 2px 0px rgba(78,205,196,0.14),0px 1px 5px 0px rgba(78,205,196,0.12)',
    '0px 3px 3px -2px rgba(78,205,196,0.2),0px 3px 4px 0px rgba(78,205,196,0.14),0px 1px 8px 0px rgba(78,205,196,0.12)',
    '0px 2px 4px -1px rgba(78,205,196,0.2),0px 4px 5px 0px rgba(78,205,196,0.14),0px 1px 10px 0px rgba(78,205,196,0.12)',
    '0px 3px 5px -1px rgba(78,205,196,0.2),0px 5px 8px 0px rgba(78,205,196,0.14),0px 1px 14px 0px rgba(78,205,196,0.12)',
    '0px 3px 5px -1px rgba(78,205,196,0.2),0px 6px 10px 0px rgba(78,205,196,0.14),0px 1px 18px 0px rgba(78,205,196,0.12)',
    '0px 4px 5px -2px rgba(78,205,196,0.2),0px 7px 10px 1px rgba(78,205,196,0.14),0px 2px 16px 1px rgba(78,205,196,0.12)',
    '0px 5px 5px -3px rgba(78,205,196,0.2),0px 8px 10px 1px rgba(78,205,196,0.14),0px 3px 14px 2px rgba(78,205,196,0.12)',
    '0px 5px 6px -3px rgba(78,205,196,0.2),0px 9px 12px 1px rgba(78,205,196,0.14),0px 3px 16px 2px rgba(78,205,196,0.12)',
    '0px 6px 6px -3px rgba(78,205,196,0.2),0px 10px 14px 1px rgba(78,205,196,0.14),0px 4px 18px 3px rgba(78,205,196,0.12)',
    '0px 6px 7px -4px rgba(78,205,196,0.2),0px 11px 15px 1px rgba(78,205,196,0.14),0px 4px 20px 3px rgba(78,205,196,0.12)',
    '0px 7px 8px -4px rgba(78,205,196,0.2),0px 12px 17px 2px rgba(78,205,196,0.14),0px 5px 22px 4px rgba(78,205,196,0.12)',
    '0px 7px 8px -4px rgba(78,205,196,0.2),0px 13px 19px 2px rgba(78,205,196,0.14),0px 5px 24px 4px rgba(78,205,196,0.12)',
    '0px 7px 9px -4px rgba(78,205,196,0.2),0px 14px 21px 2px rgba(78,205,196,0.14),0px 5px 26px 4px rgba(78,205,196,0.12)',
    '0px 8px 9px -5px rgba(78,205,196,0.2),0px 15px 22px 2px rgba(78,205,196,0.14),0px 6px 28px 5px rgba(78,205,196,0.12)',
    '0px 8px 10px -5px rgba(78,205,196,0.2),0px 16px 24px 2px rgba(78,205,196,0.14),0px 6px 30px 5px rgba(78,205,196,0.12)',
    '0px 8px 11px -5px rgba(78,205,196,0.2),0px 17px 26px 2px rgba(78,205,196,0.14),0px 6px 32px 5px rgba(78,205,196,0.12)',
    '0px 9px 11px -5px rgba(78,205,196,0.2),0px 18px 28px 2px rgba(78,205,196,0.14),0px 7px 34px 6px rgba(78,205,196,0.12)',
    '0px 9px 12px -6px rgba(78,205,196,0.2),0px 19px 29px 2px rgba(78,205,196,0.14),0px 7px 36px 6px rgba(78,205,196,0.12)',
    '0px 10px 13px -6px rgba(78,205,196,0.2),0px 20px 31px 3px rgba(78,205,196,0.14),0px 8px 38px 7px rgba(78,205,196,0.12)',
    '0px 10px 13px -6px rgba(78,205,196,0.2),0px 21px 33px 3px rgba(78,205,196,0.14),0px 8px 40px 7px rgba(78,205,196,0.12)',
    '0px 10px 14px -6px rgba(78,205,196,0.2),0px 22px 35px 3px rgba(78,205,196,0.14),0px 8px 42px 7px rgba(78,205,196,0.12)',
    '0px 11px 14px -7px rgba(78,205,196,0.2),0px 23px 36px 3px rgba(78,205,196,0.14),0px 9px 44px 8px rgba(78,205,196,0.12)',
    '0px 11px 15px -7px rgba(78,205,196,0.2),0px 24px 38px 3px rgba(78,205,196,0.14),0px 9px 46px 8px rgba(78,205,196,0.12)',
  ],
};

// Tryb ciemny
const darkTheme = {
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    mode: 'dark',
    primary: {
      main: '#4ECDC4', // Seledynowy - Seafoam Green
      light: '#7EDFD9',
      dark: '#3AA99F',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2A9D8F', // Ciemniejszy seledynowy
      light: '#57C4B8',
      dark: '#1E7268',
      contrastText: '#ffffff',
    },
    background: {
      default: '#1A2027',
      paper: '#2A3541',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#AAAAAA',
    },
  },
};

// Tryb niskiego oświetlenia (Low Light Mode)
const lowLightTheme = {
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    mode: 'dark',
    primary: {
      main: '#3AA99F', // Przyciemniony seledynowy
      light: '#5EBFB8',
      dark: '#2A7A73',
      contrastText: '#E0E0E0',
    },
    secondary: {
      main: '#1E7268', // Przyciemniony ciemny seledynowy
      light: '#3A9A8F',
      dark: '#155049',
      contrastText: '#E0E0E0',
    },
    background: {
      default: '#121A20', // Bardzo ciemne tło
      paper: '#1A242E', // Ciemne tło dla kart
    },
    text: {
      primary: '#CCCCCC', // Jaśniejszy tekst
      secondary: '#999999', // Przyciemniony tekst
    },
    // Zmniejszony kontrast dla trybu niskiego oświetlenia
    action: {
      active: 'rgba(78, 205, 196, 0.5)',
      hover: 'rgba(78, 205, 196, 0.04)',
      selected: 'rgba(78, 205, 196, 0.08)',
      disabled: 'rgba(255, 255, 255, 0.2)',
      disabledBackground: 'rgba(255, 255, 255, 0.05)',
    },
  },
  components: {
    ...baseTheme.components,
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        /* Cursor Alternatives - Niestandardowy kursor */
        body {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%233AA99F"><circle cx="12" cy="12" r="6" /></svg>') 12 12, auto !important;
        }
        
        /* Scrollytelling - Płynne przewijanie */
        html {
          scroll-behavior: smooth;
        }
        
        /* Micro Interactions - Subtelne animacje */
        * {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        /* Anti-Usability - Eksperymentalne interakcje */
        ::selection {
          background-color: #3AA99F;
          color: #E0E0E0;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // Zmniejszony kontrast dla trybu niskiego oświetlenia
          background: 'linear-gradient(45deg, #3AA99F 30%, #5EBFB8 90%)',
          '&.MuiButton-containedSecondary': {
            background: 'linear-gradient(45deg, #1E7268 30%, #3A9A8F 90%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        },
      },
    },
  },
};

// Funkcja do tworzenia motywu na podstawie trybu
export const createThemeWithMode = (mode) => {
  if (mode === 'dark') {
    return createTheme(darkTheme);
  } else if (mode === 'lowLight') {
    return createTheme(lowLightTheme);
  }
  return createTheme(baseTheme);
};

// Eksport domyślnego motywu
export default createTheme(baseTheme);
