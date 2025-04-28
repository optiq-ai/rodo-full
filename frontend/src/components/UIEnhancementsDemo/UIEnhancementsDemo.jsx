// src/components/UIEnhancementsDemo/UIEnhancementsDemo.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Paper,
  useTheme,
  CssBaseline
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createThemeWithMode } from '../../config/theme';
import BentoGrid from '../BentoGrid';
import BlurryBackground from '../BlurryBackground';
import { NeumorphicButton, NeumorphicCard } from '../NeumorphicUI';
import KineticTypography from '../KineticTypography';
import ThreeDElement from '../ThreeDElement';
import ThemeToggle from '../ThemeToggle';
import ConversationalAssistant from '../ConversationalAssistant';
import EmotionalFeedback from '../EmotionalFeedback';
import AccessibilityFeatures from '../AccessibilityFeatures';

/**
 * Komponent demonstracyjny prezentujący wszystkie zaimplementowane ulepszenia UI/UX na rok 2025.
 */
const UIEnhancementsDemo = () => {
  const [themeMode, setThemeMode] = useState('light');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState('success');
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  
  // Tworzenie motywu na podstawie wybranego trybu
  const theme = React.useMemo(() => createThemeWithMode(themeMode), [themeMode]);
  
  // Obsługa zmiany motywu
  const handleThemeChange = (mode) => {
    setThemeMode(mode);
  };
  
  // Obsługa pokazywania komunikatów emocjonalnych
  const handleShowFeedback = (type) => {
    setFeedbackType(type);
    setShowFeedback(true);
  };
  
  // Przykładowe elementy dla BentoGrid
  const bentoItems = [
    {
      id: 1,
      title: 'Analiza Ryzyka',
      subtitle: 'Najnowsze wyniki',
      content: 'Zidentyfikowano 3 nowe zagrożenia wymagające uwagi. Kliknij, aby zobaczyć szczegóły.',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Rejestry RODO',
      subtitle: '12 aktywnych rejestrów',
      content: 'Wszystkie rejestry są aktualne. Ostatnia aktualizacja: wczoraj.',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Zgody',
      subtitle: 'Statystyki zgód',
      content: 'Zebrano 156 nowych zgód w tym miesiącu. Współczynnik odrzuceń: 12%.',
      priority: 'medium',
    },
    {
      id: 4,
      title: 'Szkolenia',
      subtitle: 'Harmonogram szkoleń',
      content: 'Następne szkolenie RODO: 15 maja 2025. 8 osób zapisanych.',
      priority: 'low',
    },
    {
      id: 5,
      title: 'Incydenty',
      subtitle: 'Status incydentów',
      content: 'Brak aktywnych incydentów. Ostatni incydent zamknięto 23 dni temu.',
      priority: 'low',
    },
  ];
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          padding: 3,
          backgroundColor: theme.palette.background.default,
          transition: 'background-color 0.3s ease',
          ...(highContrast && {
            filter: 'contrast(1.5)',
          }),
          '& *': {
            ...(fontSizeMultiplier !== 1 && {
              fontSize: `${fontSizeMultiplier}rem !important`,
            }),
            ...(reduceMotion && {
              transition: 'none !important',
              animation: 'none !important',
            }),
          },
        }}
      >
        {/* Nagłówek z przełącznikiem motywu */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <KineticTypography 
            text="RODO App - Trendy UI/UX 2025" 
            variant="h4" 
            effect="wave"
            duration={3}
          />
          <ThemeToggle 
            onThemeChange={handleThemeChange} 
            currentTheme={themeMode} 
          />
        </Box>
        
        <Container maxWidth="lg">
          {/* Sekcja wprowadzająca */}
          <BlurryBackground 
            blurIntensity={15} 
            blurColor={theme.palette.primary.light}
            sx={{ mb: 6, p: 4 }}
          >
            <Typography variant="h3" gutterBottom>
              Demonstracja ulepszeń UI/UX na rok 2025
            </Typography>
            <Typography variant="body1" paragraph>
              Poniżej prezentujemy wszystkie zaimplementowane komponenty zgodne z najnowszymi trendami UI/UX na rok 2025. Każdy komponent można wykorzystać w dowolnym miejscu aplikacji RODO.
            </Typography>
          </BlurryBackground>
          
          {/* Sekcja BentoGrid */}
          <Typography variant="h4" gutterBottom>
            Bento Grids
          </Typography>
          <Typography variant="body1" paragraph>
            Modułowy układ przypominający japońskie pudełka bento, który pozwala na lepszą organizację i wyróżnienie różnych sekcji danych.
          </Typography>
          <BentoGrid items={bentoItems} sx={{ mb: 6 }} />
          
          {/* Sekcja Neumorphism */}
          <Typography variant="h4" gutterBottom>
            Neumorphism i Soft UI
          </Typography>
          <Typography variant="body1" paragraph>
            Łączenie głębi skeuomorfizmu z prostotą płaskiego designu, tworząc efekt "wyłaniania się" elementów z tła.
          </Typography>
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} md={6}>
              <NeumorphicCard 
                title="Karta Neumorficzna" 
                subheader="Przykład komponentu Soft UI"
                sx={{ p: 3, height: '100%' }}
              >
                <Typography variant="body1" paragraph>
                  Neumorfizm to trend designu, który łączy elementy skeuomorfizmu (naśladowanie rzeczywistych obiektów) z minimalizmem płaskiego designu.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <NeumorphicButton variant="contained" color="primary">
                    Przycisk Primary
                  </NeumorphicButton>
                  <NeumorphicButton variant="contained" color="secondary">
                    Przycisk Secondary
                  </NeumorphicButton>
                </Box>
              </NeumorphicCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <NeumorphicCard 
                title="Efekty Neumorficzne" 
                subheader="Miękkie cienie i subtelne gradienty"
                sx={{ p: 3, height: '100%' }}
              >
                <Typography variant="body1" paragraph>
                  Elementy neumorficzne wykorzystują cienie, które sprawiają wrażenie, że obiekt jest wytłoczony z tła lub wpuszczony w nie.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <NeumorphicButton variant="outlined" color="primary">
                    Przycisk Outlined
                  </NeumorphicButton>
                  <NeumorphicButton variant="contained" color="error">
                    Przycisk Error
                  </NeumorphicButton>
                </Box>
              </NeumorphicCard>
            </Grid>
          </Grid>
          
          {/* Sekcja 3D i Typografia Kinetyczna */}
          <Typography variant="h4" gutterBottom>
            Elementy 3D i Typografia Kinetyczna
          </Typography>
          <Typography variant="body1" paragraph>
            Dodanie głębi i realizmu do interfejsu oraz animowany tekst, który przyciąga uwagę i podkreśla ważne informacje.
          </Typography>
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Elementy 3D
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                  <ThreeDElement 
                    modelType="torus" 
                    color={theme.palette.primary.main} 
                    size={200}
                    rotationSpeed={0.01}
                    interactive={true}
                  />
                </Box>
                <Typography variant="body2">
                  Interaktywne elementy 3D reagują na ruch myszy, dodając głębię i zaangażowanie.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Typografia Kinetyczna
                </Typography>
                <Box sx={{ my: 3 }}>
                  <KineticTypography 
                    text="Animowany tekst przyciąga uwagę" 
                    variant="h5" 
                    effect="wave"
                    duration={2}
                    sx={{ mb: 3 }}
                  />
                  <KineticTypography 
                    text="Podkreśla ważne informacje" 
                    variant="h5" 
                    effect="pulse"
                    duration={2.5}
                    sx={{ mb: 3 }}
                  />
                  <KineticTypography 
                    text="Zwiększa zaangażowanie użytkownika" 
                    variant="h5" 
                    effect="rotate"
                    duration={3}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          {/* Sekcja Emocjonalny Design */}
          <Typography variant="h4" gutterBottom>
            Design Emocjonalny i Komunikaty Zwrotne
          </Typography>
          <Typography variant="body1" paragraph>
            Tworzenie interfejsu, który budzi pozytywne emocje i dostarcza empatycznych komunikatów zwrotnych.
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mb: 6 }}>
            <Typography variant="h6" gutterBottom>
              Przykłady komunikatów emocjonalnych
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, my: 3 }}>
              <Button 
                variant="contained" 
                color="success" 
                onClick={() => handleShowFeedback('success')}
              >
                Pokaż sukces
              </Button>
              <Button 
                variant="contained" 
                color="error" 
                onClick={() => handleShowFeedback('error')}
              >
                Pokaż błąd
              </Button>
              <Button 
                variant="contained" 
                color="warning" 
                onClick={() => handleShowFeedback('warning')}
              >
                Pokaż ostrzeżenie
              </Button>
              <Button 
                variant="contained" 
                color="info" 
                onClick={() => handleShowFeedback('info')}
              >
                Pokaż informację
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => handleShowFeedback('celebration')}
              >
                Pokaż celebrację
              </Button>
            </Box>
            <Typography variant="body2">
              Kliknij przyciski powyżej, aby zobaczyć różne typy komunikatów emocjonalnych.
            </Typography>
          </Paper>
          
          {/* Sekcja Dostępność */}
          <Typography variant="h4" gutterBottom>
            Dostępność i Inkluzywny Design
          </Typography>
          <Typography variant="body1" paragraph>
            Zgodność z wytycznymi WCAG 2.2 i European Accessibility Act, zapewniająca dostępność dla wszystkich użytkowników.
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mb: 6 }}>
            <Typography variant="h6" gutterBottom>
              Funkcje dostępności
            </Typography>
            <Typography variant="body2" paragraph>
              Kliknij ikonę dostępności w prawym dolnym rogu ekranu, aby otworzyć panel ustawień dostępności. Możesz tam dostosować rozmiar tekstu, kontrast, redukcję ruchu i wsparcie dla czytników ekranu.
            </Typography>
            <Typography variant="body2">
              Wszystkie komponenty w aplikacji są zgodne z wytycznymi WCAG 2.2 i zapewniają odpowiedni kontrast, nawigację klawiaturą i etykiety dla czytników ekranu.
            </Typography>
          </Paper>
          
          {/* Sekcja Interfejsy Konwersacyjne */}
          <Typography variant="h4" gutterBottom>
            Interfejsy Konwersacyjne
          </Typography>
          <Typography variant="body1" paragraph>
            Chatboty i asystenci AI do pomocy użytkownikom w korzystaniu z aplikacji.
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mb: 6 }}>
            <Typography variant="h6" gutterBottom>
              Asystent RODO
            </Typography>
            <Typography variant="body2" paragraph>
              Kliknij ikonę asystenta w prawym dolnym rogu ekranu, aby otworzyć interfejs konwersacyjny. Asystent pomoże Ci w korzystaniu z aplikacji RODO, odpowiadając na pytania i dostarczając wskazówek.
            </Typography>
            <Typography variant="body2">
              Możesz zadawać pytania dotyczące rejestrów RODO, analizy ryzyka, zarządzania zgodami i generowania raportów.
            </Typography>
          </Paper>
        </Container>
        
        {/* Komponenty interfejsu użytkownika */}
        <ConversationalAssistant />
        <AccessibilityFeatures 
          onFontSizeChange={setFontSizeMultiplier}
          onContrastChange={setHighContrast}
          onReduceMotionChange={setReduceMotion}
        />
        
        {/* Komunikat emocjonalny */}
        {showFeedback && (
          <EmotionalFeedback 
            type={feedbackType}
            position="top-center"
            autoHideDuration={4000}
            onClose={() => setShowFeedback(false)}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default UIEnhancementsDemo;
