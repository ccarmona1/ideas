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

  // Punto donde el elemento se vuelve invisible durante el arrastre
  // Útil para feedback visual
  OPACITY_THRESHOLD: -80, // Era -50, ahora espera más antes de desaparecer

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

// Función helper para determinar la opacidad durante el arrastre
export const calculateDragOpacity = (dragY: number): number => {
  return dragY < DRAG_CONFIG.OPACITY_THRESHOLD ? 0 : 1;
};
