import React, { useState, useRef, useCallback } from 'react';
import './DragHint.css';

export interface SimpleDragHintProps {
  text: string;
  onAction: () => void;
  canDrag?: boolean;
  onDragStart?: () => void;
  onDragMove?: (deltaY: number, opacity: number) => void;
  onDragEnd?: () => void;
}

export const SimpleDragHint: React.FC<SimpleDragHintProps> = ({
  text,
  onAction,
  canDrag = true,
  onDragStart,
  onDragMove,
  onDragEnd,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [dragStarted, setDragStarted] = useState(false);

  const startY = useRef<number | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  // Configuración de drag
  const DRAG_THRESHOLD = 15; // Mínimo para considerar drag (reducido para más sensibilidad)
  const ACTION_THRESHOLD = 80; // Mínimo hacia arriba para ejecutar acción (reducido para más fácil)
  const DOWNWARD_RESISTANCE = 0.4; // Un poco menos de resistencia hacia abajo

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!canDrag) return;

      e.preventDefault();
      e.stopPropagation(); // Evitar propagación
      setIsDragging(true);
      setDragStarted(false);
      startY.current = e.clientY;

      if (elementRef.current) {
        elementRef.current.setPointerCapture(e.pointerId);
      }

      // NO notificar al padre aquí - esperar hasta que se confirme el drag
    },
    [canDrag]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || startY.current === null) return;

      e.preventDefault();
      e.stopPropagation(); // Evitar propagación
      const deltaY = e.clientY - startY.current;
      const absDelta = Math.abs(deltaY);

      // Marcar como drag iniciado si supera el umbral
      if (!dragStarted && absDelta >= DRAG_THRESHOLD) {
        setDragStarted(true);
        // Notificar al padre que realmente se inició el drag
        onDragStart?.();
      }

      // Solo mostrar feedback visual si el drag ya se inició
      if (dragStarted) {
        // Aplicar resistencia al movimiento hacia abajo
        const adjustedDelta =
          deltaY > 0 ? deltaY * DOWNWARD_RESISTANCE : deltaY;
        setDragY(adjustedDelta);

        // Calcular opacidad para el feedback
        const opacity = Math.max(0.3, 1 + adjustedDelta / 200);

        // Notificar al padre sobre el movimiento
        onDragMove?.(adjustedDelta, opacity);
      }
    },
    [isDragging, dragStarted, onDragMove, onDragStart]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;

      e.preventDefault();
      e.stopPropagation(); // Evitar propagación

      if (elementRef.current) {
        elementRef.current.releasePointerCapture(e.pointerId);
      }

      // Si se arrastró hacia arriba lo suficiente, ejecutar acción
      if (dragStarted && dragY < -ACTION_THRESHOLD) {
        onAction();
      }
      // Si no fue un drag real (no superó umbral), tratar como click
      else if (!dragStarted) {
        onAction();
      }

      // Notificar al padre que terminó el drag
      onDragEnd?.();

      // Reset
      setIsDragging(false);
      setDragStarted(false);
      setDragY(0);
      startY.current = null;
    },
    [isDragging, dragStarted, dragY, onAction, onDragEnd]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Solo procesar click si no fue un evento drag
      if (!dragStarted && !isDragging) {
        e.preventDefault();
        e.stopPropagation(); // Evitar propagación del click
        onAction();
      }
    },
    [dragStarted, isDragging, onAction]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onAction();
      }
    },
    [onAction]
  );

  // Calcular opacidad basada en drag
  const opacity = dragStarted
    ? Math.max(0.3, 1 + dragY / 200) // Fade out al arrastrar hacia arriba
    : 1;

  return (
    <div
      ref={elementRef}
      className={`drag-hint drag-hint-interactive ${
        isDragging ? 'dragging' : ''
      }`}
      style={{
        transform: dragStarted ? `translateY(${dragY}px)` : 'none',
        opacity,
        transition: isDragging
          ? 'none'
          : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', // Spring easing
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={text}
    >
      {text}
    </div>
  );
};
