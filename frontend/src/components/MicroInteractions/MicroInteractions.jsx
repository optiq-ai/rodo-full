// src/components/MicroInteractions/MicroInteractions.jsx
import React, { useEffect } from 'react';

// Komponent implementujący trend "Micro Interactions"
const MicroInteractions = () => {
  useEffect(() => {
    // Dodanie globalnych stylów dla mikro-interakcji
    const style = document.createElement('style');
    style.textContent = `
      /* Efekt hover dla przycisków */
      button:not(.MuiIconButton-root):hover {
        transform: translateY(-3px);
        box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1);
      }
      
      /* Efekt kliknięcia dla przycisków */
      button:not(.MuiIconButton-root):active {
        transform: translateY(-1px);
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
      }
      
      /* Efekt hover dla kart */
      .MuiCard-root {
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
      }
      
      .MuiCard-root:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
      }
      
      /* Efekt hover dla linków */
      a {
        position: relative;
        text-decoration: none;
      }
      
      a:after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -2px;
        left: 0;
        background-color: currentColor;
        transition: width 0.3s ease;
      }
      
      a:hover:after {
        width: 100%;
      }
      
      /* Efekt hover dla ikon */
      .MuiSvgIcon-root {
        transition: transform 0.2s ease;
      }
      
      .MuiIconButton-root:hover .MuiSvgIcon-root {
        transform: scale(1.2);
      }
      
      /* Efekt focus dla pól formularza */
      .MuiOutlinedInput-root.Mui-focused {
        transform: scale(1.02);
      }
      
      /* Animacja dla elementów listy */
      .MuiListItem-root {
        transition: transform 0.2s ease, background-color 0.2s ease;
      }
      
      .MuiListItem-root:hover {
        transform: translateX(5px);
      }
    `;
    document.head.appendChild(style);

    // Dodanie obsługi zdarzeń dla mikro-interakcji
    const handleMouseMove = (e) => {
      // Efekt "magnetic buttons" - przyciąganie kursora do przycisków
      const buttons = document.querySelectorAll('button:not(.MuiIconButton-root)');
      buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - buttonCenterX;
        const distanceY = e.clientY - buttonCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // Jeśli kursor jest blisko przycisku (w promieniu 100px)
        if (distance < 100) {
          const strength = 40; // Siła przyciągania
          const pull = 1 - (distance / 100); // Im bliżej, tym silniejsze przyciąganie
          
          const moveX = distanceX * pull * (strength / 100);
          const moveY = distanceY * pull * (strength / 100);
          
          button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          button.style.transform = '';
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.head.removeChild(style);
    };
  }, []);

  // Komponent nie renderuje żadnych elementów wizualnych
  return null;
};

export default MicroInteractions;
