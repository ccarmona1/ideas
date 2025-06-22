import { useState, useRef, useCallback } from 'react';
import { DRAG_CONFIG, calculateDragResistance } from './dragConfig';

interface UseDragGestureProps {
  onSwipeUp: () => void;
  canDrag: boolean;
  threshold?: number; // Opcional, usa DRAG_CONFIG.SWIPE_THRESHOLD por defecto
}

export const useDragGesture = ({
  onSwipeUp,
  canDrag,
  threshold = DRAG_CONFIG.SWIPE_THRESHOLD, // Usar configuración centralizada
}: UseDragGestureProps) => {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPotentialDrag, setIsPotentialDrag] = useState(false); // Nuevo estado
  const dragStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startDrag = useCallback(
    (clientY: number) => {
      if (canDrag && !isAnimating && !isDragging) {
        setIsPotentialDrag(true);
        dragStartY.current = clientY;
        return true;
      }
      return false;
    },
    [canDrag, isAnimating, isDragging]
  );

  const updateDrag = useCallback(
    (clientY: number) => {
      if (dragStartY.current === null) return;

      const deltaY = clientY - dragStartY.current;
      const absDeltaY = Math.abs(deltaY);

      // Si estamos en estado potencial y superamos el umbral, iniciar arrastre real
      if (
        isPotentialDrag &&
        !isDragging &&
        absDeltaY >= DRAG_CONFIG.DRAG_START_THRESHOLD
      ) {
        setIsPotentialDrag(false);
        setIsDragging(true);

        if (containerRef.current) {
          containerRef.current.style.willChange = 'transform';
        }

        // Prevenir scroll durante el arrastre
        document.body.style.overflow = 'hidden';
      }

      // Solo actualizar posición si ya estamos arrastrando
      if (isDragging) {
        setDragY(calculateDragResistance(deltaY));
      }
    },
    [isDragging, isPotentialDrag]
  );

  const endDrag = useCallback(() => {
    // Limpiar estados de arrastre
    setIsPotentialDrag(false);
    dragStartY.current = null;

    if (!isDragging) {
      // Si no estábamos arrastrando realmente, solo limpiar
      return;
    }

    setIsDragging(false);
    setIsAnimating(true);

    // Restaurar configuraciones
    document.body.style.overflow = '';
    if (containerRef.current) {
      containerRef.current.style.willChange = 'auto';
    }

    if (dragY < threshold) {
      // Arrastrar hacia arriba suficiente - ejecutar acción inmediatamente
      onSwipeUp();

      // Resetear posición inmediatamente después de la acción
      setDragY(0);

      // Limpiar estado de animación
      setTimeout(() => {
        setIsAnimating(false);
      }, DRAG_CONFIG.ANIMATION.CLEANUP_DELAY);
    } else {
      // Volver a la posición original
      setDragY(0);
      setTimeout(
        () => setIsAnimating(false),
        DRAG_CONFIG.ANIMATION.RESET_DELAY
      );
    }
  }, [isDragging, dragY, threshold, onSwipeUp]);

  // Event handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (startDrag(e.clientY)) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [startDrag]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isDragging || isPotentialDrag) {
        e.preventDefault();
        e.stopPropagation();
        updateDrag(e.clientY);
      }
    },
    [isDragging, isPotentialDrag, updateDrag]
  );

  const handlePointerUp = useCallback(
    (e?: React.PointerEvent<HTMLDivElement>) => {
      if (isDragging || isPotentialDrag) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        endDrag();
      }
    },
    [isDragging, isPotentialDrag, endDrag]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      if (startDrag(touch.clientY)) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [startDrag]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (isDragging || isPotentialDrag) {
        e.preventDefault();
        e.stopPropagation();
        const touch = e.touches[0];
        updateDrag(touch.clientY);
      }
    },
    [isDragging, isPotentialDrag, updateDrag]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (isDragging || isPotentialDrag) {
        e.preventDefault();
        e.stopPropagation();
        endDrag();
      }
    },
    [isDragging, isPotentialDrag, endDrag]
  );

  const resetPosition = useCallback(() => {
    setDragY(0);
    setIsDragging(false);
    setIsAnimating(false);
    setIsPotentialDrag(false);
    dragStartY.current = null;
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
