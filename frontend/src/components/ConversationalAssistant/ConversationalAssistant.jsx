// src/components/ConversationalAssistant/ConversationalAssistant.jsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  IconButton, 
  Typography, 
  Avatar, 
  Tooltip, 
  Zoom,
  useTheme
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PropTypes from 'prop-types';

/**
 * Komponent ConversationalAssistant implementujący trend UI "Conversational Interfaces" na rok 2025.
 * Tworzy interfejs konwersacyjny (chatbot) do pomocy użytkownikom w korzystaniu z aplikacji.
 */
const ConversationalAssistant = ({
  initialMessage = 'Witaj! Jestem asystentem RODO. W czym mogę Ci pomóc?',
  suggestions = [
    'Jak dodać nowy rejestr?',
    'Jak przeprowadzić analizę ryzyka?',
    'Jak zarządzać zgodami?',
    'Jak wygenerować raport?'
  ],
  onSendMessage,
  sx = {}
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: initialMessage, 
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Przewijanie do najnowszej wiadomości
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Fokus na polu wprowadzania po otwarciu
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [isOpen]);

  // Obsługa wysyłania wiadomości
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Dodanie wiadomości użytkownika
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Symulacja odpowiedzi asystenta
    let response;
    
    if (onSendMessage) {
      // Jeśli dostarczono funkcję obsługi, użyj jej
      response = await onSendMessage(inputValue);
    } else {
      // W przeciwnym razie użyj domyślnych odpowiedzi
      response = getDefaultResponse(inputValue);
    }

    // Symulacja opóźnienia pisania
    setTimeout(() => {
      const assistantMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Losowe opóźnienie między 1-2s
  };

  // Domyślne odpowiedzi na podstawie wiadomości użytkownika
  const getDefaultResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('rejestr') || lowerMessage.includes('dodać')) {
      return 'Aby dodać nowy rejestr, przejdź do sekcji "Rejestry RODO" i kliknij przycisk "Dodaj nowy rejestr". Wypełnij wymagane pola w formularzu i zapisz zmiany.';
    } else if (lowerMessage.includes('ryzyko') || lowerMessage.includes('analiz')) {
      return 'Aby przeprowadzić analizę ryzyka, przejdź do sekcji "Analiza Ryzyka" i kliknij "Nowa analiza". Wybierz aktywa, zidentyfikuj zagrożenia i oceń poziom ryzyka według metodologii.';
    } else if (lowerMessage.includes('zgod') || lowerMessage.includes('consent')) {
      return 'Zarządzanie zgodami odbywa się w module "Zarządzanie Zgodami". Możesz tam dodawać nowe formularze zgód, przeglądać istniejące i generować raporty dotyczące zebranych zgód.';
    } else if (lowerMessage.includes('raport') || lowerMessage.includes('report')) {
      return 'Aby wygenerować raport, przejdź do sekcji "Raporty i Analizy", wybierz typ raportu z listy dostępnych szablonów, określ zakres danych i kliknij "Generuj".';
    } else if (lowerMessage.includes('dzięk') || lowerMessage.includes('thank')) {
      return 'Cieszę się, że mogłem pomóc! Czy masz jeszcze jakieś pytania dotyczące systemu RODO?';
    } else if (lowerMessage.includes('cześć') || lowerMessage.includes('witaj') || lowerMessage.includes('hej')) {
      return 'Witaj! Jak mogę Ci dzisiaj pomóc w kwestiach związanych z RODO?';
    } else {
      return 'Przepraszam, nie jestem pewien, jak odpowiedzieć na to pytanie. Czy możesz sprecyzować, czego dokładnie szukasz w systemie RODO?';
    }
  };

  // Obsługa naciśnięcia Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Obsługa kliknięcia w sugestię
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // Formatowanie czasu
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Przycisk otwierania/zamykania asystenta
  const toggleButton = (
    <Tooltip 
      title={isOpen ? "Zamknij asystenta" : "Otwórz asystenta RODO"} 
      placement="left"
      TransitionComponent={Zoom}
    >
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '56px',
          height: '56px',
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          boxShadow: theme.shadows[4],
          zIndex: 1000,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        {isOpen ? <CloseIcon /> : <SmartToyIcon />}
      </IconButton>
    </Tooltip>
  );

  // Główny interfejs asystenta
  const assistantInterface = (
    <Paper
      elevation={6}
      sx={{
        position: 'fixed',
        bottom: '90px',
        right: '20px',
        width: '350px',
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 999,
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        // Intentional Imperfection - Nieregularne kształty
        clipPath: 'polygon(0% 0%, 97% 0%, 100% 3%, 100% 100%, 3% 100%, 0% 97%)',
        transform: isOpen ? 'scale(1)' : 'scale(0)',
        opacity: isOpen ? 1 : 0,
        transformOrigin: 'bottom right',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        ...sx
      }}
    >
      {/* Nagłówek */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
        }}
      >
        <Avatar
          sx={{
            backgroundColor: 'white',
            color: theme.palette.primary.main,
            width: 36,
            height: 36,
            marginRight: 2,
          }}
        >
          <SmartToyIcon />
        </Avatar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Asystent RODO
        </Typography>
        <IconButton
          size="small"
          onClick={() => setIsOpen(false)}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Obszar wiadomości */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '16px',
          backgroundColor: theme.palette.mode === 'dark' ? '#1A1A1A' : '#F8F9FA',
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
              marginBottom: 2,
            }}
          >
            {message.sender === 'assistant' && (
              <Avatar
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  width: 32,
                  height: 32,
                  marginRight: 1,
                  marginTop: 0.5,
                }}
              >
                <SmartToyIcon fontSize="small" />
              </Avatar>
            )}
            <Box
              sx={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: message.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                backgroundColor: message.sender === 'user' ? theme.palette.primary.main : theme.palette.background.paper,
                color: message.sender === 'user' ? 'white' : theme.palette.text.primary,
                boxShadow: theme.shadows[1],
                position: 'relative',
                // Micro Interactions - Animacja wejścia
                animation: 'messageAppear 0.3s forwards',
                '@keyframes messageAppear': {
                  from: {
                    opacity: 0,
                    transform: message.sender === 'user' ? 'translateX(20px)' : 'translateX(-20px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              <Typography variant="body1">{message.text}</Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: message.sender === 'user' ? 'left' : 'right',
                  marginTop: 0.5,
                  opacity: 0.7,
                }}
              >
                {formatTime(message.timestamp)}
              </Typography>
            </Box>
          </Box>
        ))}
        {isTyping && (
          <Box
            sx={{
              display: 'flex',
              marginBottom: 2,
            }}
          >
            <Avatar
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: 32,
                height: 32,
                marginRight: 1,
                marginTop: 0.5,
              }}
            >
              <SmartToyIcon fontSize="small" />
            </Avatar>
            <Box
              sx={{
                padding: '12px 16px',
                borderRadius: '18px 18px 18px 4px',
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[1],
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& > span': {
                    width: '8px',
                    height: '8px',
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '50%',
                    margin: '0 2px',
                    opacity: 0.7,
                    animation: 'typing 1s infinite',
                  },
                  '& > span:nth-of-type(1)': {
                    animationDelay: '0s',
                  },
                  '& > span:nth-of-type(2)': {
                    animationDelay: '0.2s',
                  },
                  '& > span:nth-of-type(3)': {
                    animationDelay: '0.4s',
                  },
                  '@keyframes typing': {
                    '0%, 100%': {
                      transform: 'translateY(0)',
                    },
                    '50%': {
                      transform: 'translateY(-5px)',
                    },
                  },
                }}
              >
                <span />
                <span />
                <span />
              </Box>
            </Box>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Sugestie */}
      {suggestions.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            padding: '8px 16px',
            borderTop: `1px solid ${theme.palette.divider}`,
            '&::-webkit-scrollbar': {
              height: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.primary.main,
              borderRadius: '4px',
            },
          }}
        >
          {suggestions.map((suggestion, index) => (
            <Tooltip key={index} title={suggestion} placement="top">
              <Box
                onClick={() => handleSuggestionClick(suggestion)}
                sx={{
                  padding: '8px 12px',
                  margin: '0 4px',
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '16px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                    color: 'white',
                    transform: 'translateY(-2px)',
                  },
                  // Intentional Imperfection - Nieregularne kształty
                  clipPath: index % 2 === 0 
                    ? 'polygon(0% 0%, 97% 0%, 100% 10%, 100% 100%, 3% 100%, 0% 90%)'
                    : 'polygon(0% 10%, 97% 0%, 100% 90%, 100% 100%, 3% 100%, 0% 0%)',
                }}
              >
                {suggestion.length > 25 ? `${suggestion.substring(0, 22)}...` : suggestion}
              </Box>
            </Tooltip>
          ))}
        </Box>
      )}

      {/* Pole wprowadzania */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <TextField
          inputRef={inputRef}
          fullWidth
          placeholder="Napisz wiadomość..."
          variant="outlined"
          size="small"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        />
        <IconButton
          color="primary"
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
          sx={{
            marginLeft: 1,
            backgroundColor: inputValue.trim() ? theme.palette.primary.main : 'transparent',
            color: inputValue.trim() ? 'white' : theme.palette.action.disabled,
            '&:hover': {
              backgroundColor: inputValue.trim() ? theme.palette.primary.dark : 'transparent',
            },
            transition: 'all 0.2s',
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );

  return (
    <>
      {toggleButton}
      {assistantInterface}
    </>
  );
};

ConversationalAssistant.propTypes = {
  /**
   * Początkowa wiadomość od asystenta
   */
  initialMessage: PropTypes.string,
  /**
   * Lista sugestii dla użytkownika
   */
  suggestions: PropTypes.arrayOf(PropTypes.string),
  /**
   * Funkcja wywoływana po wysłaniu wiadomości przez użytkownika
   * Powinna zwracać odpowiedź asystenta (string lub Promise<string>)
   */
  onSendMessage: PropTypes.func,
  /**
   * Dodatkowe style dla komponentu
   */
  sx: PropTypes.object,
};

export default ConversationalAssistant;
