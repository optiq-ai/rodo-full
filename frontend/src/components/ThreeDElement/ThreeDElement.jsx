// src/components/ThreeDElement/ThreeDElement.jsx
import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import * as THREE from 'three';

/**
 * Komponent ThreeDElement implementujący trend UI "3D elements immersive design" na rok 2025.
 * Tworzy interaktywne elementy 3D, które dodają głębię i realizm do interfejsu.
 */
const ThreeDElement = ({
  modelType = 'cube',
  color = '#FF5252',
  size = 200,
  rotationSpeed = 0.01,
  interactive = true,
  backgroundColor = 'transparent',
  sx = {},
  ...props
}) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const objectRef = useRef(null);
  const frameIdRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Inicjalizacja sceny 3D
  useEffect(() => {
    if (!containerRef.current) return;

    // Ustawienie sceny
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Ustawienie kamery
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Ustawienie renderera
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: backgroundColor === 'transparent'
    });
    renderer.setClearColor(backgroundColor === 'transparent' ? 0x000000 : backgroundColor, backgroundColor === 'transparent' ? 0 : 1);
    renderer.setSize(size, size);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Dodanie oświetlenia
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Tworzenie obiektu 3D w zależności od wybranego typu
    let object;

    switch (modelType) {
      case 'cube':
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({ 
          color: new THREE.Color(color),
          roughness: 0.3,
          metalness: 0.7
        });
        object = new THREE.Mesh(geometry, material);
        break;

      case 'sphere':
        const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const sphereMaterial = new THREE.MeshStandardMaterial({ 
          color: new THREE.Color(color),
          roughness: 0.2,
          metalness: 0.8
        });
        object = new THREE.Mesh(sphereGeometry, sphereMaterial);
        break;

      case 'torus':
        const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        const torusMaterial = new THREE.MeshStandardMaterial({ 
          color: new THREE.Color(color),
          roughness: 0.5,
          metalness: 0.6
        });
        object = new THREE.Mesh(torusGeometry, torusMaterial);
        break;

      case 'cone':
        const coneGeometry = new THREE.ConeGeometry(1.5, 3, 32);
        const coneMaterial = new THREE.MeshStandardMaterial({ 
          color: new THREE.Color(color),
          roughness: 0.4,
          metalness: 0.5
        });
        object = new THREE.Mesh(coneGeometry, coneMaterial);
        break;

      case 'pyramid':
        const pyramidGeometry = new THREE.TetrahedronGeometry(2);
        const pyramidMaterial = new THREE.MeshStandardMaterial({ 
          color: new THREE.Color(color),
          roughness: 0.3,
          metalness: 0.7
        });
        object = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
        break;

      default:
        const defaultGeometry = new THREE.BoxGeometry(2, 2, 2);
        const defaultMaterial = new THREE.MeshStandardMaterial({ 
          color: new THREE.Color(color),
          roughness: 0.3,
          metalness: 0.7
        });
        object = new THREE.Mesh(defaultGeometry, defaultMaterial);
    }

    scene.add(object);
    objectRef.current = object;

    // Funkcja animacji
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (interactive) {
        // Interaktywna rotacja na podstawie pozycji myszy
        object.rotation.x += rotationSpeed;
        object.rotation.y += rotationSpeed;
        
        // Dodatkowa rotacja w kierunku myszy
        object.rotation.x += (mousePosition.current.y * 0.01 - object.rotation.x) * 0.1;
        object.rotation.y += (mousePosition.current.x * 0.01 - object.rotation.y) * 0.1;
      } else {
        // Stała rotacja
        object.rotation.x += rotationSpeed;
        object.rotation.y += rotationSpeed;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Obsługa zmiany rozmiaru
    const handleResize = () => {
      if (containerRef.current) {
        const width = size;
        const height = size;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // Obsługa ruchu myszy
    const handleMouseMove = (event) => {
      if (!containerRef.current || !interactive) return;

      const rect = containerRef.current.getBoundingClientRect();
      
      // Normalizacja pozycji myszy do zakresu [-1, 1]
      mousePosition.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1
      };
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Czyszczenie
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (objectRef.current) {
        if (objectRef.current.geometry) objectRef.current.geometry.dispose();
        if (objectRef.current.material) objectRef.current.material.dispose();
        sceneRef.current.remove(objectRef.current);
      }
      
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      objectRef.current = null;
    };
  }, [modelType, color, size, rotationSpeed, interactive, backgroundColor]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: '8px',
        ...sx
      }}
      {...props}
    />
  );
};

ThreeDElement.propTypes = {
  /**
   * Typ modelu 3D (cube, sphere, torus, cone, pyramid)
   */
  modelType: PropTypes.oneOf(['cube', 'sphere', 'torus', 'cone', 'pyramid']),
  /**
   * Kolor modelu 3D
   */
  color: PropTypes.string,
  /**
   * Rozmiar kontenera w pikselach
   */
  size: PropTypes.number,
  /**
   * Prędkość rotacji modelu
   */
  rotationSpeed: PropTypes.number,
  /**
   * Czy model ma reagować na ruch myszy
   */
  interactive: PropTypes.bool,
  /**
   * Kolor tła (lub 'transparent' dla przezroczystego tła)
   */
  backgroundColor: PropTypes.string,
  /**
   * Dodatkowe style dla kontenera
   */
  sx: PropTypes.object,
};

export default ThreeDElement;
