// src/components/SoundEffects/SoundEffects.jsx
import React, { useEffect, useRef } from 'react';

// Komponent implementujący trend "Sound Elements"
const SoundEffects = () => {
  const clickSoundRef = useRef(null);
  const hoverSoundRef = useRef(null);
  const successSoundRef = useRef(null);
  const errorSoundRef = useRef(null);
  const notificationSoundRef = useRef(null);

  useEffect(() => {
    // Funkcja do tworzenia dźwięków za pomocą Web Audio API
    const createOscillator = (type, frequency, duration, volume) => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      gainNode.gain.value = volume;
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      
      // Wyciszanie dźwięku przed zakończeniem
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      
      // Zatrzymanie oscylatora po zakończeniu dźwięku
      setTimeout(() => {
        oscillator.stop();
        audioContext.close();
      }, duration * 1000);
    };

    // Funkcja odtwarzająca dźwięk kliknięcia
    const playClickSound = () => {
      createOscillator('sine', 800, 0.1, 0.05);
    };

    // Funkcja odtwarzająca dźwięk najechania
    const playHoverSound = () => {
      createOscillator('sine', 600, 0.05, 0.02);
    };

    // Funkcja odtwarzająca dźwięk sukcesu
    const playSuccessSound = () => {
      // Pierwszy dźwięk
      createOscillator('sine', 600, 0.1, 0.05);
      // Drugi dźwięk z opóźnieniem
      setTimeout(() => {
        createOscillator('sine', 800, 0.15, 0.05);
      }, 100);
    };

    // Funkcja odtwarzająca dźwięk błędu
    const playErrorSound = () => {
      // Pierwszy dźwięk
      createOscillator('square', 300, 0.1, 0.05);
      // Drugi dźwięk z opóźnieniem
      setTimeout(() => {
        createOscillator('square', 200, 0.15, 0.05);
      }, 100);
    };

    // Funkcja odtwarzająca dźwięk powiadomienia
    const playNotificationSound = () => {
      createOscillator('sine', 700, 0.1, 0.05);
      setTimeout(() => {
        createOscillator('sine', 900, 0.1, 0.05);
      }, 100);
      setTimeout(() => {
        createOscillator('sine', 1100, 0.1, 0.05);
      }, 200);
    };

    // Nasłuchiwanie zdarzeń
    const handleClick = (e) => {
      // Sprawdzenie, czy kliknięto przycisk lub link
      if (
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('button') ||
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.closest('a') ||
        e.target.role === 'button'
      ) {
        playClickSound();
      }
    };

    const handleMouseOver = (e) => {
      // Sprawdzenie, czy najechano na przycisk lub link
      if (
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('button') ||
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.closest('a') ||
        e.target.role === 'button'
      ) {
        playHoverSound();
      }
    };

    // Nasłuchiwanie zdarzeń niestandardowych
    const handleSuccessEvent = () => {
      playSuccessSound();
    };

    const handleErrorEvent = () => {
      playErrorSound();
    };

    const handleNotificationEvent = () => {
      playNotificationSound();
    };

    // Dodanie nasłuchiwaczy zdarzeń
    document.addEventListener('click', handleClick);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('sound:success', handleSuccessEvent);
    document.addEventListener('sound:error', handleErrorEvent);
    document.addEventListener('sound:notification', handleNotificationEvent);

    // Usunięcie nasłuchiwaczy przy odmontowaniu komponentu
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('sound:success', handleSuccessEvent);
      document.removeEventListener('sound:error', handleErrorEvent);
      document.removeEventListener('sound:notification', handleNotificationEvent);
    };
  }, []);

  // Funkcje pomocnicze do wyzwalania dźwięków z innych komponentów
  useEffect(() => {
    // Dodanie funkcji pomocniczych do obiektu window
    window.soundEffects = {
      playSuccess: () => {
        document.dispatchEvent(new CustomEvent('sound:success'));
      },
      playError: () => {
        document.dispatchEvent(new CustomEvent('sound:error'));
      },
      playNotification: () => {
        document.dispatchEvent(new CustomEvent('sound:notification'));
      }
    };

    return () => {
      // Usunięcie funkcji pomocniczych przy odmontowaniu komponentu
      delete window.soundEffects;
    };
  }, []);

  // Komponent nie renderuje żadnych elementów wizualnych
  return null;
};

export default SoundEffects;
