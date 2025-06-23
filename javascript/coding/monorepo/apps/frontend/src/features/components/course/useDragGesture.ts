import { useState, useRef, useCallback } from 'react';
import {
  DRAG_CONFIG,
  calculateDragResistance,
  getSwipeThreshold,
} from './dragConfig';

interface UseDragGestureProps {
  onSwipeUp: () => void;
  canDrag: boolean;
  threshold?: number; // Opcional, usa DRAG_CONFIG.SWIPE_THRESHOLD por defecto
}

export const useDragGesture = ({
  onSwipeUp,
  canDrag,
  threshold, // Removemos el valor por defecto para calcularlo dinámicamente
}: UseDragGestureProps) => {
  // Detectar si es móvil
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768;

  // Usar umbral apropiado según el dispositivo
  const effectiveThreshold = threshold ?? getSwipeThreshold(isMobile);

  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasMovedThreshold, setHasMovedThreshold] = useState(false);
  const dragStartY = useRef<number | null>(null);
  const dragStartTime = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startDrag = useCallback(
    (clientY: number) => {
      if (canDrag && !isAnimating && !isDragging) {
        setIsDragging(true);
        setHasMovedThreshold(false);
        dragStartY.current = clientY;
        dragStartTime.current = Date.now();

        if (containerRef.current) {
          containerRef.current.style.willChange = 'transform';
        }

        // NO prevenir scroll inmediatamente, solo cuando supere el umbral
        return true;
      }
      return false;
    },
    [canDrag, isAnimating, isDragging]
  );

  const updateDrag = useCallback(
    (clientY: number) => {
      if (!isDragging || dragStartY.current === null) return;

      const deltaY = clientY - dragStartY.current;
      const absDeltaY = Math.abs(deltaY);

      // Solo considerar que realmente se está arrastrando si supera el umbral
      if (!hasMovedThreshold && absDeltaY >= DRAG_CONFIG.DRAG_START_THRESHOLD) {
        setHasMovedThreshold(true);
        // Ahora sí prevenir scroll
        document.body.style.overflow = 'hidden';
      }

      // Solo mostrar feedback visual si se supera el umbral mínimo
      if (hasMovedThreshold) {
        setDragY(calculateDragResistance(deltaY));
      } else {
        // Si no se supera el umbral, mantener en posición original
        setDragY(0);
      }
    },
    [isDragging, hasMovedThreshold]
  );

  const endDrag = useCallback(() => {
    // Limpiar estados de arrastre
    dragStartY.current = null;
    dragStartTime.current = null;

    if (!isDragging) {
      // Si no estábamos arrastrando realmente, solo limpiar
      return;
    }

    const wasRealDrag = hasMovedThreshold;

    setIsDragging(false);
    setHasMovedThreshold(false);
    setIsAnimating(true);

    // Restaurar configuraciones
    document.body.style.overflow = '';
    if (containerRef.current) {
      containerRef.current.style.willChange = 'auto';
    }

    // Solo ejecutar acción si fue un drag real y superó el umbral de ejecución
    if (wasRealDrag && dragY < effectiveThreshold) {
      // Arrastrar hacia arriba suficiente - ejecutar acción inmediatamente
      onSwipeUp();

      // Resetear posición inmediatamente después de la acción
      setDragY(0);

      // Limpiar estado de animación
      setTimeout(() => {
        setIsAnimating(false);
      }, DRAG_CONFIG.ANIMATION.CLEANUP_DELAY);
    } else {
      // Volver a la posición original (no fue drag real o no superó umbral)
      setDragY(0);
      setTimeout(
        () => setIsAnimating(false),
        DRAG_CONFIG.ANIMATION.RESET_DELAY
      );
    }
  }, [isDragging, hasMovedThreshold, dragY, effectiveThreshold, onSwipeUp]);

  // Event handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (canDrag && startDrag(e.clientY)) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [canDrag, startDrag]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (canDrag && isDragging) {
        e.preventDefault();
        e.stopPropagation();
        updateDrag(e.clientY);
      }
    },
    [canDrag, isDragging, updateDrag]
  );

  const handlePointerUp = useCallback(
    (e?: React.PointerEvent<HTMLDivElement>) => {
      if (canDrag && isDragging) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        endDrag();
      }
    },
    [canDrag, isDragging, endDrag]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (canDrag) {
        const touch = e.touches[0];
        if (startDrag(touch.clientY)) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    },
    [canDrag, startDrag]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (canDrag && isDragging) {
        e.preventDefault();
        e.stopPropagation();
        const touch = e.touches[0];
        updateDrag(touch.clientY);
      }
    },
    [canDrag, isDragging, updateDrag]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (canDrag && isDragging) {
        e.preventDefault();
        e.stopPropagation();
        endDrag();
      }
    },
    [canDrag, isDragging, endDrag]
  );

  const resetPosition = useCallback(() => {
    setDragY(0);
    setIsDragging(false);
    setIsAnimating(false);
    setHasMovedThreshold(false);
    dragStartY.current = null;
    dragStartTime.current = null;
  }, []);

  return {
    containerRef,
    dragY,
    isDragging,
    isAnimating,
    resetPosition, // Nueva función para resetear desde el padre
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerUp,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
};
