export const DRAG_CONFIG = {
  SWIPE_THRESHOLD: -250, // Aumentado de -180 a -250px (más movimiento necesario)
  DRAG_START_THRESHOLD: 8, // Nuevo: mínimo movimiento para iniciar arrastre
  DOWNWARD_RESISTANCE: 0.3,
  OPACITY_FADE_START: -80, // Ajustado para el nuevo umbral
  OPACITY_FADE_END: -160, // Ajustado para el nuevo umbral
  ANIMATION: {
    CLEANUP_DELAY: 100,
    RESET_DELAY: 300,
    SUCCESS_FEEDBACK_DELAY: 200,
  },
  CSS: {
    TRANSFORM_DURATION: '0.1s',
    EASING: 'ease-out',
  },
} as const;

export const getSwipeThreshold = (isMobile = false): number => {
  return isMobile
    ? DRAG_CONFIG.SWIPE_THRESHOLD + 50 // Aumentado de +30 a +50px para móvil
    : DRAG_CONFIG.SWIPE_THRESHOLD;
};

export const calculateDragResistance = (deltaY: number): number => {
  const resistanceFactor = deltaY > 0 ? DRAG_CONFIG.DOWNWARD_RESISTANCE : 1;
  return deltaY * resistanceFactor < 0 ? deltaY * resistanceFactor : 0;
};

export const calculateDragOpacity = (dragY: number): number => {
  if (dragY >= DRAG_CONFIG.OPACITY_FADE_START) {
    return 1;
  }

  if (dragY <= DRAG_CONFIG.OPACITY_FADE_END) {
    return 0;
  }

  const fadeRange =
    DRAG_CONFIG.OPACITY_FADE_START - DRAG_CONFIG.OPACITY_FADE_END;
  const currentPosition = dragY - DRAG_CONFIG.OPACITY_FADE_END;
  const opacity = currentPosition / fadeRange;

  return Math.max(0, Math.min(1, opacity * opacity));
};
