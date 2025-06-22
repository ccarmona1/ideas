export const DRAG_CONFIG = {
  SWIPE_THRESHOLD: -300, // Aumentado aún más para requerir más movimiento
  DRAG_START_THRESHOLD: 25, // Aumentado significativamente de 8 a 25px
  DOWNWARD_RESISTANCE: 0.1, // Aumentada resistencia hacia abajo (de 0.3 a 0.1)
  OPACITY_FADE_START: -100, // Ajustado para el nuevo umbral
  OPACITY_FADE_END: -200, // Ajustado para el nuevo umbral
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
    ? DRAG_CONFIG.SWIPE_THRESHOLD + 80 // Aumentado de +50 a +80px para móvil (-220px)
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
