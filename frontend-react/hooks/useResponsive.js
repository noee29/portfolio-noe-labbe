import { useState, useEffect } from 'react';

/**
 * Retourne un objet avec les propriétés: isMobile, isTablet, isDesktop, screenSize
 */
export function useResponsive() {
  const [screenSize, setScreenSize] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 1024;
  });

  useEffect(() => {
    // Fonction pour mettre à jour la taille de l'écran
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener('resize', handleResize);

    // Nettoyer l'écouteur à la destruction du composant
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    screenSize,
    isMobile: screenSize < 768,      // < md
    isTablet: screenSize >= 768 && screenSize < 1024,  // md à lg
    isDesktop: screenSize >= 1024,   // >= lg
    isSmallScreen: screenSize < 640, // < sm
  };
}
