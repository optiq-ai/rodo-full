// src/components/AntiUsability/AntiUsabilityInteractions.jsx
import React, { useEffect } from 'react';

// Komponent implementujący trend "Anti-Usability"
const AntiUsabilityInteractions = () => {
  useEffect(() => {
    // Funkcja do losowego przesuwania elementów przy najechaniu
    const addRandomMovement = () => {
      const buttons = document.querySelectorAll('.MuiButton-root');
      
      buttons.forEach(button => {
        const originalTransform = button.style.transform;
        const originalTransition = button.style.transition;
        
        button.addEventListener('mouseover', () => {
          // 30% szans na "ucieczkę" przycisku
          if (Math.random() < 0.3) {
            const randomX = (Math.random() - 0.5) * 50;
            const randomY = (Math.random() - 0.5) * 50;
            
            button.style.transition = 'transform 0.2s ease';
            button.style.transform = `translate(${randomX}px, ${randomY}px)`;
            
            // Przywrócenie oryginalnej pozycji po krótkim czasie
            setTimeout(() => {
              button.style.transform = originalTransform;
            }, 500);
          }
        });
        
        button.addEventListener('mouseout', () => {
          button.style.transform = originalTransform;
          button.style.transition = originalTransition;
        });
      });
    };
    
    // Funkcja do losowego odwracania tekstu
    const addRandomTextReversals = () => {
      const textElements = document.querySelectorAll('h1, h2, h3, p');
      
      textElements.forEach(element => {
        // 5% szans na odwrócenie tekstu przy najechaniu
        element.addEventListener('mouseover', () => {
          if (Math.random() < 0.05) {
            const originalText = element.textContent;
            element.dataset.originalText = originalText;
            element.textContent = originalText.split('').reverse().join('');
            
            // Przywrócenie oryginalnego tekstu po 2 sekundach
            setTimeout(() => {
              element.textContent = element.dataset.originalText;
            }, 2000);
          }
        });
      });
    };
    
    // Funkcja do losowego zmieniania kolorów
    const addRandomColorChanges = () => {
      const elements = document.querySelectorAll('.MuiPaper-root, .MuiCard-root');
      
      elements.forEach(element => {
        const originalBackground = element.style.backgroundColor;
        const originalTransition = element.style.transition;
        
        // 10% szans na zmianę koloru przy najechaniu
        element.addEventListener('mouseover', () => {
          if (Math.random() < 0.1) {
            const randomHue = Math.floor(Math.random() * 360);
            element.style.transition = 'background-color 0.5s ease';
            element.style.backgroundColor = `hsl(${randomHue}, 70%, 80%)`;
            
            // Przywrócenie oryginalnego koloru po 1 sekundzie
            setTimeout(() => {
              element.style.backgroundColor = originalBackground;
            }, 1000);
          }
        });
        
        element.addEventListener('mouseout', () => {
          element.style.backgroundColor = originalBackground;
          element.style.transition = originalTransition;
        });
      });
    };
    
    // Funkcja do losowego obracania elementów
    const addRandomRotations = () => {
      const cards = document.querySelectorAll('.MuiCard-root');
      
      cards.forEach(card => {
        const originalTransform = card.style.transform;
        const originalTransition = card.style.transition;
        
        // 15% szans na obrót przy najechaniu
        card.addEventListener('mouseover', () => {
          if (Math.random() < 0.15) {
            const randomRotation = (Math.random() - 0.5) * 10;
            card.style.transition = 'transform 0.3s ease';
            card.style.transform = `${originalTransform} rotate(${randomRotation}deg)`;
          }
        });
        
        card.addEventListener('mouseout', () => {
          card.style.transform = originalTransform;
          card.style.transition = originalTransition;
        });
      });
    };
    
    // Opóźnienie inicjalizacji, aby dać czas na załadowanie innych komponentów
    setTimeout(() => {
      addRandomMovement();
      addRandomTextReversals();
      addRandomColorChanges();
      addRandomRotations();
    }, 2000);
    
    // Brak funkcji czyszczącej, ponieważ nasłuchiwacze zdarzeń są dodawane do elementów DOM,
    // które będą usunięte przy odmontowaniu komponentu
  }, []);
  
  // Komponent nie renderuje żadnych elementów wizualnych
  return null;
};

export default AntiUsabilityInteractions;
