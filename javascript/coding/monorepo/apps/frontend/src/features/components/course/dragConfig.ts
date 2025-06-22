/**
 * Configuración del sistema de arrastre
 * Ajusta estos valores para cambiar la sensibilidad y comportamiento del arrastre
 */

export const DRAG_CONFIG = {
  // Distancia mínima hacia arriba (en px) para activar el swipe
  // Valores más negativos = menos sensible (requiere arrastrar más)
  SWIPE_THRESHOLD: -180, // Era -100, ahora requiere 80px más de arrastre

  // Factor de resistencia cuando se arrastra hacia abajo
  // 0.1 = muy resistente, 1.0 = sin resistencia
  DOWNWARD_RESISTANCE: 0.3,

  // Punto donde el elemento EMPIEZA a desaparecer durante el arrastre
  // La opacidad será gradual desde este punto hasta OPACITY_FADE_END
  OPACITY_FADE_START: -60, // Empieza a desaparecer a los -60px

  // Punto donde el elemento está completamente invisible
  OPACITY_FADE_END: -120, // Completamente invisible a los -120px

  // Velocidad de las animaciones (en ms)
  ANIMATION: {
    // Tiempo para limpiar el estado de animación después del swipe
    CLEANUP_DELAY: 100,

    // Tiempo para volver a la posición original si no se alcanza el threshold
    RESET_DELAY: 300,

    // Tiempo para mostrar feedback de éxito antes de cambiar pregunta
    SUCCESS_FEEDBACK_DELAY: 200,
  },

  // Configuración de transiciones CSS
  CSS: {
    // Tiempo de transición cuando no se está arrastrando
    TRANSFORM_DURATION: '0.1s',

    // Función de easing para las transiciones
    EASING: 'ease-out',
  },
} as const;

// Función helper para obtener el threshold basado en el tipo de dispositivo
export const getSwipeThreshold = (isMobile = false): number => {
  // En móviles puede ser ligeramente más sensible por la interfaz táctil
  return isMobile
    ? DRAG_CONFIG.SWIPE_THRESHOLD + 30
    : DRAG_CONFIG.SWIPE_THRESHOLD;
};

// Función helper para calcular la resistencia del arrastre
export const calculateDragResistance = (deltaY: number): number => {
  const resistanceFactor = deltaY > 0 ? DRAG_CONFIG.DOWNWARD_RESISTANCE : 1;
  return deltaY * resistanceFactor < 0 ? deltaY * resistanceFactor : 0;
};

// Función helper para determinar la opacidad durante el arrastre (gradual)
export const calculateDragOpacity = (dragY: number): number => {
  // Si está por encima del punto de inicio, opacidad completa
  if (dragY >= DRAG_CONFIG.OPACITY_FADE_START) {
    return 1;
  }

  // Si está por debajo del punto final, opacidad cero
  if (dragY <= DRAG_CONFIG.OPACITY_FADE_END) {
    return 0;
  }

  // En el rango intermedio, calcular opacidad gradual
  const fadeRange =
    DRAG_CONFIG.OPACITY_FADE_START - DRAG_CONFIG.OPACITY_FADE_END;
  const currentPosition = dragY - DRAG_CONFIG.OPACITY_FADE_END;
  const opacity = currentPosition / fadeRange;

  // Asegurar que esté entre 0 y 1, y aplicar una curva suave
  return Math.max(0, Math.min(1, opacity * opacity)); // Curva cuadrática para transición más suave
};
