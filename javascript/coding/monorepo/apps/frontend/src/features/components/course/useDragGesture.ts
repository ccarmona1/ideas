import { useState, useRef, useCallback } from 'react';

interface UseDragGestureProps {
  onSwipeUp: () => void;
  canDrag: boolean;
  threshold?: number;
}

export const useDragGesture = ({
  onSwipeUp,
  canDrag,
  threshold = -100,
}: UseDragGestureProps) => {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dragStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startDrag = useCallback(
    (clientY: number) => {
      if (canDrag && !isAnimating) {
        setIsDragging(true);
        dragStartY.current = clientY;

        if (containerRef.current) {
          containerRef.current.style.willChange = 'transform';
        }

        // Prevenir scroll durante el arrastre
        document.body.style.overflow = 'hidden';
        return true;
      }
      return false;
    },
    [canDrag, isAnimating]
  );

  const updateDrag = useCallback(
    (clientY: number) => {
      if (isDragging && dragStartY.current !== null) {
        const deltaY = clientY - dragStartY.current;
        const resistanceFactor = deltaY > 0 ? 0.3 : 1;
        setDragY(deltaY * resistanceFactor < 0 ? deltaY * resistanceFactor : 0);
      }
    },
    [isDragging]
  );

  const endDrag = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    setIsAnimating(true);

    // Restaurar configuraciones
    document.body.style.overflow = '';
    if (containerRef.current) {
      containerRef.current.style.willChange = 'auto';
    }

    if (dragY < threshold) {
      // Arrastrar hacia arriba suficiente - ejecutar acción
      setDragY(-window.innerHeight);
      
      // Ejecutar la acción inmediatamente para evitar el flash
      onSwipeUp();
      
      // Resetear después de que la animación del componente termine
      setTimeout(() => {
        setDragY(0);
        setIsAnimating(false);
      }, 400); // Tiempo mayor para dar espacio a la transición del componente
    } else {
      // Volver a la posición original
      setDragY(0);
      setTimeout(() => setIsAnimating(false), 300);
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
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        updateDrag(e.clientY);
      }
    },
    [isDragging, updateDrag]
  );

  const handlePointerUp = useCallback(
    (e?: React.PointerEvent<HTMLDivElement>) => {
      if (isDragging) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        endDrag();
      }
    },
    [isDragging, endDrag]
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
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        const touch = e.touches[0];
        updateDrag(touch.clientY);
      }
    },
    [isDragging, updateDrag]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        endDrag();
      }
    },
    [isDragging, endDrag]
  );

  return {
    containerRef,
    dragY,
    isDragging,
    isAnimating,
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
