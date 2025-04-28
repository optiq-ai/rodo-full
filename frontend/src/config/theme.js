// src/config/theme.js - Rozszerzenie o tryb niskiego oświetlenia (Low Light Mode)
import { createTheme } from '@mui/material/styles';

// Bazowy motyw (istniejący)
const baseTheme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#FF5252', // Jaskrawy czerwony - Bright and Bold Designs
      light: '#FF867F',
      dark: '#C50E29',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00E5FF', // Jaskrawy turkusowy - Bright and Bold Designs
      light: '#6EFFFF',
      dark: '#00B2CC',
      contrastText: '#000000',
    },
    error: {
      main: '#FF1744', // Jaskrawy czerwony
    },
    warning: {
      main: '#FFAB00', // Jaskrawy pomarańczowy
    },
    info: {
      main: '#2979FF', // Jaskrawy niebieski
    },
    success: {
      main: '#00E676', // Jaskrawy zielony
    },
    background: {
      default: '#F8F0FF', // Jasnofioletowe tło - Bright and Bold Designs
      paper: '#ffffff',   // Białe tło dla kart
    },
    text: {
      primary: '#37474F',
      secondary: '#546E7A',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
    action: {
      active: 'rgba(255, 82, 82, 0.7)',
      hover: 'rgba(255, 82, 82, 0.08)',
      selected: 'rgba(255, 82, 82, 0.16)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
    // Dodatkowe kolory dla akcentów - Bright and Bold Designs
    accent1: {
      main: '#FF4081', // Różowy
      light: '#FF79B0',
      dark: '#C60055',
    },
    accent2: {
      main: '#00BFA5', // Turkusowy
      light: '#5DF2D6',
      dark: '#008E76',
    },
    accent3: {
      main: '#FFEA00', // Jaskrawy żółty - dodano dla większej różnorodności
      light: '#FFFF56',
      dark: '#C7B800',
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
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%23FF5252"><circle cx="12" cy="12" r="6" /></svg>') 12 12, auto !important;
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
          background-color: #FF5252;
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
          background: 'linear-gradient(45deg, #FF5252 30%, #FF867F 90%)',
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
            background: 'linear-gradient(45deg, #00E5FF 30%, #6EFFFF 90%)',
            color: '#000000',
          },
          '&.MuiButton-outlined': {
            background: 'transparent',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: '#FF5252',
            borderRadius: '8px 2px 8px 2px', // Intentional Imperfection - Odwrócony promień
            '&:hover': {
              borderWidth: '2px',
              transform: 'translateY(-3px)', // Micro Interactions - Animacja przy najechaniu
              boxShadow: '0 7px 14px rgba(255, 82, 82, 0.2)',
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
              background: '#FF5252',
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
          boxShadow: '0 10px 30px rgba(255, 82, 82, 0.15)',
          background: '#ffffff',
          borderTop: '3px solid #FF5252',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
          // Micro Interactions - Subtelne animacje
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            transform: 'translateY(-8px) rotate(0.5deg)', // Intentional Imperfection - Lekkie przekrzywienie
            boxShadow: '0 15px 35px rgba(255, 82, 82, 0.2)',
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
              borderColor: '#FF5252',
              borderWidth: '2px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF5252',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#FF5252',
          },
          // Micro Interactions - Animacja przy wpisywaniu
          '& .MuiInputBase-input': {
            transition: 'background-color 0.3s',
          },
          '& .MuiInputBase-input:focus': {
            backgroundColor: 'rgba(255, 82, 82, 0.05)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          // Bright and Bold Designs - Odważne kolory i gradienty
          background: 'linear-gradient(90deg, #FF5252 0%, #FF867F 100%)',
          boxShadow: '0 4px 20px rgba(255, 82, 82, 0.15)',
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
          background: 'linear-gradient(180deg, #F8F0FF 0%, #ffffff 100%)',
          borderRight: '1px solid rgba(255, 82, 82, 0.1)',
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
            backgroundColor: 'rgba(255, 82, 82, 0.08)',
            borderLeft: '4px solid #FF5252',
            // Intentional Imperfection - Asymetryczne podświetlenie
            borderRight: '2px solid transparent',
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 82, 82, 0.04)',
            transform: 'translateX(4px)', // Micro Interactions - Przesunięcie przy najechaniu
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 82, 82, 0.08)',
        },
        head: {
          fontWeight: 600,
          backgroundColor: 'rgba(255, 82, 82, 0.05)',
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
            background: 'linear-gradient(45deg, #FF5252 30%, #FF867F 90%)',
          },
          '&.MuiChip-colorSecondary': {
            background: 'linear-gradient(45deg, #00E5FF 30%, #6EFFFF 90%)',
          },
          '&.MuiChip-colorSuccess': {
            background: 'linear-gradient(45deg, #00E676 30%, #69F0AE 90%)',
          },
          '&.MuiChip-colorError': {
            background: 'linear-gradient(45deg, #FF1744 30%, #FF5252 90%)',
          },
          '&.MuiChip-colorWarning': {
            background: 'linear-gradient(45deg, #FFAB00 30%, #FFD740 90%)',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          // Intentional Imperfection - Nieregularne kształty
          borderRadius: '16px 4px 16px 4px',
          boxShadow: '0 10px 30px rgba(255, 82, 82, 0.15)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          // Intentional Imperfection - Nieregularne kształty
          borderRadius: '16px 4px 16px 4px',
          boxShadow: '0 15px 35px rgba(255, 82, 82, 0.2)',
          borderTop: '3px solid #FF5252',
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
    '0px 2px 1px -1px rgba(255,82,82,0.2),0px 1px 1px 0px rgba(255,82,82,0.14),0px 1px 3px 0px rgba(255,82,82,0.12)',
    '0px 3px 1px -2px rgba(255,82,82,0.2),0px 2px 2px 0px rgba(255,82,82,0.14),0px 1px 5px 0px rgba(255,82,82,0.12)',
    '0px 3px 3px -2px rgba(255,82,82,0.2),0px 3px 4px 0px rgba(255,82,82,0.14),0px 1px 8px 0px rgba(255,82,82,0.12)',
    '0px 2px 4px -1px rgba(255,82,82,0.2),0px 4px 5px 0px rgba(255,82,82,0.14),0px 1px 10px 0px rgba(255,82,82,0.12)',
    '0px 3px 5px -1px rgba(255,82,82,0.2),0px 5px 8px 0px rgba(255,82,82,0.14),0px 1px 14px 0px rgba(255,82,82,0.12)',
    '0px 3px 5px -1px rgba(255,82,82,0.2),0px 6px 10px 0px rgba(255,82,82,0.14),0px 1px 18px 0px rgba(255,82,82,0.12)',
    '0px 4px 5px -2px rgba(255,82,82,0.2),0px 7px 10px 1px rgba(255,82,82,0.14),0px 2px 16px 1px rgba(255,82,82,0.12)',
    '0px 5px 5px -3px rgba(255,82,82,0.2),0px 8px 10px 1px rgba(255,82,82,0.14),0px 3px 14px 2px rgba(255,82,82,0.12)',
    '0px 5px 6px -3px rgba(255,82,82,0.2),0px 9px 12px 1px rgba(255,82,82,0.14),0px 3px 16px 2px rgba(255,82,82,0.12)',
    '0px 6px 6px -3px rgba(255,82,82,0.2),0px 10px 14px 1px rgba(255,82,82,0.14),0px 4px 18px 3px rgba(255,82,82,0.12)',
    '0px 6px 7px -4px rgba(255,82,82,0.2),0px 11px 15px 1px rgba(255,82,82,0.14),0px 4px 20px 3px rgba(255,82,82,0.12)',
    '0px 7px 8px -4px rgba(255,82,82,0.2),0px 12px 17px 2px rgba(255,82,82,0.14),0px 5px 22px 4px rgba(255,82,82,0.12)',
    '0px 7px 8px -4px rgba(255,82,82,0.2),0px 13px 19px 2px rgba(255,82,82,0.14),0px 5px 24px 4px rgba(255,82,82,0.12)',
    '0px 7px 9px -4px rgba(255,82,82,0.2),0px 14px 21px 2px rgba(255,82,82,0.14),0px 5px 26px 4px rgba(255,82,82,0.12)',
    '0px 8px 9px -5px rgba(255,82,82,0.2),0px 15px 22px 2px rgba(255,82,82,0.14),0px 6px 28px 5px rgba(255,82,82,0.12)',
    '0px 8px 10px -5px rgba(255,82,82,0.2),0px 16px 24px 2px rgba(255,82,82,0.14),0px 6px 30px 5px rgba(255,82,82,0.12)',
    '0px 8px 11px -5px rgba(255,82,82,0.2),0px 17px 26px 2px rgba(255,82,82,0.14),0px 6px 32px 5px rgba(255,82,82,0.12)',
    '0px 9px 11px -5px rgba(255,82,82,0.2),0px 18px 28px 2px rgba(255,82,82,0.14),0px 7px 34px 6px rgba(255,82,82,0.12)',
    '0px 9px 12px -6px rgba(255,82,82,0.2),0px 19px 29px 2px rgba(255,82,82,0.14),0px 7px 36px 6px rgba(255,82,82,0.12)',
    '0px 10px 13px -6px rgba(255,82,82,0.2),0px 20px 31px 3px rgba(255,82,82,0.14),0px 8px 38px 7px rgba(255,82,82,0.12)',
    '0px 10px 13px -6px rgba(255,82,82,0.2),0px 21px 33px 3px rgba(255,82,82,0.14),0px 8px 40px 7px rgba(255,82,82,0.12)',
    '0px 10px 14px -6px rgba(255,82,82,0.2),0px 22px 35px 3px rgba(255,82,82,0.14),0px 8px 42px 7px rgba(255,82,82,0.12)',
    '0px 11px 14px -7px rgba(255,82,82,0.2),0px 23px 36px 3px rgba(255,82,82,0.14),0px 9px 44px 8px rgba(255,82,82,0.12)',
    '0px 11px 15px -7px rgba(255,82,82,0.2),0px 24px 38px 3px rgba(255,82,82,0.14),0px 9px 46px 8px rgba(255,82,82,0.12)',
  ],
};

// Nowy motyw niskiego oświetlenia (Low Light Mode)
const lowLightTheme = {
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    mode: 'dark',
    primary: {
      main: '#FF7A7A', // Stonowany czerwony
      light: '#FFA5A5',
      dark: '#D45555',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#80E5FF', // Stonowany turkusowy
      light: '#B3F0FF',
      dark: '#4DCCFF',
      contrastText: '#121212',
    },
    error: {
      main: '#FF6B6B', // Stonowany czerwony
    },
    warning: {
      main: '#FFCC80', // Stonowany pomarańczowy
    },
    info: {
      main: '#80B3FF', // Stonowany niebieski
    },
    success: {
      main: '#80E5B3', // Stonowany zielony
    },
    background: {
      default: '#121212', // Bardzo ciemne tło
      paper: '#1E1E1E',   // Ciemne tło dla kart
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#B0B0B0',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
    action: {
      active: 'rgba(255, 122, 122, 0.7)',
      hover: 'rgba(255, 122, 122, 0.08)',
      selected: 'rgba(255, 122, 122, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.26)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
    // Dodatkowe kolory dla akcentów w trybie niskiego oświetlenia
    accent1: {
      main: '#FF80AB', // Stonowany różowy
      light: '#FFBAD2',
      dark: '#C94F7C',
    },
    accent2: {
      main: '#80CBC4', // Stonowany turkusowy
      light: '#B2DFDB',
      dark: '#4DB6AC',
    },
    accent3: {
      main: '#FFF59D', // Stonowany żółty
      light: '#FFFDE7',
      dark: '#FFF176',
    }
  },
  components: {
    ...baseTheme.components,
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        /* Cursor Alternatives - Niestandardowy kursor dla trybu niskiego oświetlenia */
        body {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%23FF7A7A"><circle cx="12" cy="12" r="6" /></svg>') 12 12, auto !important;
        }
        
        /* Scrollytelling - Płynne przewijanie */
        html {
          scroll-behavior: smooth;
        }
        
        /* Micro Interactions - Subtelne animacje */
        * {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        /* Anti-Usability - Eksperymentalne interakcje dla trybu niskiego oświetlenia */
        ::selection {
          background-color: #FF7A7A;
          color: #121212;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // Intentional Imperfection - Nieregularne kształty
          borderRadius: '2px 8px 2px 8px',
          padding: '10px 24px',
          // Stonowane gradienty dla trybu niskiego oświetlenia
          background: 'linear-gradient(45deg, #FF7A7A 30%, #FFA5A5 90%)',
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
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            transition: 'all 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
          '&.MuiButton-containedSecondary': {
            background: 'linear-gradient(45deg, #80E5FF 30%, #B3F0FF 90%)',
            color: '#121212',
          },
          '&.MuiButton-outlined': {
            background: 'transparent',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: '#FF7A7A',
            borderRadius: '8px 2px 8px 2px', // Intentional Imperfection - Odwrócony promień
            '&:hover': {
              borderWidth: '2px',
              transform: 'translateY(-3px)', // Micro Interactions - Animacja przy najechaniu
              boxShadow: '0 7px 14px rgba(255, 122, 122, 0.2)',
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
              background: '#FF7A7A',
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
          // Stonowane cienie dla trybu niskiego oświetlenia
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          background: '#1E1E1E',
          borderTop: '3px solid #FF7A7A',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          // Micro Interactions - Subtelne animacje
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            transform: 'translateY(-8px) rotate(0.5deg)', // Intentional Imperfection - Lekkie przekrzywienie
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          // Stonowane gradienty dla trybu niskiego oświetlenia
          background: 'linear-gradient(90deg, #2A2A2A 0%, #333333 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          color: '#E0E0E0',
          // Intentional Imperfection - Nieregularne kształty
          borderRadius: '0 0 16px 0', // Zaokrąglenie tylko w prawym dolnym rogu
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          // Stonowane gradienty dla trybu niskiego oświetlenia
          background: 'linear-gradient(180deg, #1A1A1A 0%, #121212 100%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          // Intentional Imperfection - Nieregularne kształty
          borderTopRightRadius: '16px',
          borderBottomRightRadius: '16px',
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
            background: 'linear-gradient(45deg, #FF7A7A 30%, #FFA5A5 90%)',
          },
          '&.MuiChip-colorSecondary': {
            background: 'linear-gradient(45deg, #80E5FF 30%, #B3F0FF 90%)',
            color: '#121212',
          },
        },
      },
    },
  },
};

// Funkcja do tworzenia motywu na podstawie trybu
const createThemeWithMode = (mode = 'light') => {
  return createTheme(mode === 'lowLight' ? lowLightTheme : baseTheme);
};

// Eksport domyślnego motywu (jasny)
const theme = createTheme(baseTheme);

export { createThemeWithMode };
export default theme;
