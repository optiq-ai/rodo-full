# Wytyczne UI dla aplikacji RODO

## Schemat kolorów

Aplikacja RODO wykorzystuje jasny, pastelowy schemat kolorów, który zapewnia przyjemny dla oka interfejs i dobrą czytelność.

### Kolory podstawowe

- **Główny kolor**: jasnoniebieski (#4285f4)
- **Kolor dodatkowy**: jasnozielony (#4caf50)
- **Tło**: jasne, białe lub jasnoszare (#f5f7fa)
- **Akcenty**:
  - Niebieski (#4285f4) - dla przycisków akcji, linków
  - Zielony (#4caf50) - dla pozytywnych akcji, sukcesu
  - Czerwony (#f44336) - dla błędów, alertów
  - Pomarańczowy (#ffc107) - dla ostrzeżeń

### Paleta pastelowa

Dla elementów UI, które wymagają subtelnego wyróżnienia, stosujemy pastelowe odcienie:

- Pastelowy niebieski (#b3d1ff)
- Pastelowy zielony (#c8e6c9)
- Pastelowy czerwony (#ffcdd2)
- Pastelowy żółty (#fff9c4)
- Pastelowy fioletowy (#e1bee7)
- Pastelowy turkusowy (#b2ebf2)

## Typografia

### Fonty

- **Nagłówki**: Roboto, sans-serif
- **Tekst podstawowy**: Open Sans, sans-serif
- **Kod**: Roboto Mono, monospace

### Rozmiary fontów

- H1: 32px
- H2: 24px
- H3: 20px
- H4: 18px
- Tekst podstawowy: 16px
- Tekst pomocniczy: 14px
- Tekst drobny: 12px

### Wagi fontów

- Nagłówki: 500 (medium)
- Tekst podstawowy: 400 (regular)
- Tekst wyróżniony: 600 (semi-bold)

## Komponenty UI

### Przyciski

#### Przyciski podstawowe

- **Przycisk główny (Primary)**: tło #4285f4, tekst biały
- **Przycisk dodatkowy (Secondary)**: tło białe, obramowanie #4285f4, tekst #4285f4
- **Przycisk sukcesu (Success)**: tło #4caf50, tekst biały
- **Przycisk ostrzegawczy (Warning)**: tło #ffc107, tekst czarny
- **Przycisk błędu (Error)**: tło #f44336, tekst biały

#### Stany przycisków

- **Hover**: przyciemnienie koloru tła o 10%
- **Active**: przyciemnienie koloru tła o 20%
- **Disabled**: przezroczystość 50%

### Formularze

#### Pola formularzy

- **Pole tekstowe**: białe tło, jasnoszare obramowanie (#e0e0e0)
- **Pole aktywne**: białe tło, niebieskie obramowanie (#4285f4)
- **Pole z błędem**: białe tło, czerwone obramowanie (#f44336)
- **Pole wyłączone**: jasnoszare tło (#f5f5f5), jasnoszare obramowanie (#e0e0e0)

#### Etykiety

- Umieszczone nad polami formularza
- Kolor: ciemnoszary (#333333)
- Rozmiar: 14px

#### Komunikaty błędów

- Umieszczone pod polami formularza
- Kolor: czerwony (#f44336)
- Rozmiar: 12px

### Karty (Cards)

- Białe tło
- Delikatne cienie (box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1))
- Zaokrąglone rogi (border-radius: 8px)
- Padding: 16px

### Tabele

- Nagłówki: jasnoszare tło (#f5f5f5), ciemnoszary tekst (#333333)
- Wiersze: białe tło, ciemnoszary tekst (#333333)
- Wiersze naprzemienne: bardzo jasnoszare tło (#fafafa)
- Hover na wierszu: jasnoniebieskie tło (#e3f2fd)
- Obramowanie: jasnoszare (#e0e0e0)

### Ikony

- Biblioteka: Material Icons
- Rozmiar: 24px dla standardowych ikon, 18px dla mniejszych
- Kolor: dopasowany do kontekstu (np. niebieski dla akcji, czerwony dla usuwania)

## Układ (Layout)

### Siatka (Grid)

- Szerokość kontenera: max-width 1200px, centered
- Odstępy między kolumnami: 24px
- Odstępy między wierszami: 24px

### Odstępy (Spacing)

- XS: 4px
- S: 8px
- M: 16px
- L: 24px
- XL: 32px
- XXL: 48px

### Nagłówek (Header)

- Wysokość: 64px
- Tło: białe
- Cień: delikatny (box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1))
- Logo: po lewej stronie
- Nawigacja: po prawej stronie

### Menu boczne (Sidebar)

- Szerokość: 240px
- Tło: białe
- Elementy menu: wysokość 48px, padding 16px
- Aktywny element: jasnoniebieskie tło (#e3f2fd), niebieski pasek po lewej stronie

### Stopka (Footer)

- Wysokość: 48px
- Tło: jasnoszare (#f5f5f5)
- Tekst: ciemnoszary (#333333)

## Responsywność

### Breakpointy

- XS: 0px (telefony w orientacji pionowej)
- SM: 600px (telefony w orientacji poziomej)
- MD: 960px (tablety)
- LG: 1280px (laptopy)
- XL: 1920px (duże monitory)

### Zachowanie responsywne

- Menu boczne zamienia się w menu hamburger na urządzeniach mobilnych
- Układ jednokolumnowy na urządzeniach mobilnych
- Tabele przewijalne poziomo na urządzeniach mobilnych
- Przyciski dostosowują szerokość do dostępnej przestrzeni

## Dostępność (Accessibility)

### Kontrast

- Minimalny współczynnik kontrastu: 4.5:1 dla tekstu normalnego
- Minimalny współczynnik kontrastu: 3:1 dla dużego tekstu (18px+)

### Fokus

- Wyraźne oznaczenie elementów z fokusem (outline: 2px solid #4285f4)
- Zachowanie kolejności tabulacji zgodnej z logicznym przepływem strony

### Alternatywne teksty

- Wszystkie obrazy muszą mieć atrybuty alt
- Ikony funkcyjne muszą mieć etykiety aria-label

## Animacje i przejścia

### Przejścia (Transitions)

- Czas trwania: 150-300ms
- Funkcja czasowa: ease-in-out
- Elementy z przejściami: przyciski, pola formularzy, karty

### Animacje

- Oszczędne użycie animacji
- Animacje powinny być subtelne i wspierać UX
- Możliwość wyłączenia animacji (prefers-reduced-motion)

## Przykłady implementacji

### Przycisk główny (Material-UI)

```jsx
<Button 
  variant="contained" 
  color="primary"
  sx={{
    backgroundColor: '#4285f4',
    '&:hover': {
      backgroundColor: '#3367d6',
    },
    borderRadius: '4px',
    textTransform: 'none',
    fontWeight: 500,
  }}
>
  Zapisz
</Button>
```

### Karta (Material-UI)

```jsx
<Card
  sx={{
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    marginBottom: '24px',
  }}
>
  <CardHeader
    title="Tytuł karty"
    sx={{
      '& .MuiCardHeader-title': {
        fontSize: '20px',
        fontWeight: 500,
        color: '#333333',
      },
    }}
  />
  <CardContent>
    <Typography variant="body1" color="#333333">
      Treść karty
    </Typography>
  </CardContent>
</Card>
```

### Pole formularza (Material-UI)

```jsx
<TextField
  label="Nazwa"
  variant="outlined"
  fullWidth
  sx={{
    marginBottom: '16px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#e0e0e0',
      },
      '&:hover fieldset': {
        borderColor: '#b3b3b3',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4285f4',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#333333',
    },
  }}
/>
```

## Konfiguracja motywu Material-UI

```jsx
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4285f4',
      light: '#80b4ff',
      dark: '#0059c1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4caf50',
      light: '#80e27e',
      dark: '#087f23',
      contrastText: '#ffffff',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ffc107',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#757575',
    },
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
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0, 0, 0, 0.1)',
    // ... pozostałe cienie
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    {/* Komponenty aplikacji */}
  </ThemeProvider>
);
```

## Podsumowanie

Wytyczne UI dla aplikacji RODO zostały zaprojektowane z myślą o jasnym, pastelowym interfejsie, który zapewnia dobrą czytelność i przyjemne doświadczenie użytkownika. Konsekwentne stosowanie tych wytycznych zapewni spójny wygląd aplikacji i ułatwi użytkownikom korzystanie z niej.
