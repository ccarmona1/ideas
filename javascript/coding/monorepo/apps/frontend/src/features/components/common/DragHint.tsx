import React, { useRef, useCallback } from 'react';
import './DragHint.css';
import type { DragHandlers } from '../../../types';

export interface DragHintProps {
  text: string;
  onAction?: () => void;
  dragHandlers?: DragHandlers;
  canDrag?: boolean;
}

export const DragHint: React.FC<DragHintProps> = ({
  text,
  onAction,
  dragHandlers,
  canDrag = true,
}) => {
  const isDraggingRef = useRef(false);
  const dragStartTimeRef = useRef<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onAction?.();
    }
  };

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      console.log('DragHint click handler called', {
        isDragging: isDraggingRef.current,
        hasHandlers: !!dragHandlers,
        canDrag,
        onAction: !!onAction,
      });

      // Solo ejecutar click si no se ha iniciado un drag
      const clickTime = Date.now();
      const timeSinceStart = dragStartTimeRef.current
        ? clickTime - dragStartTimeRef.current
        : 0;

      // Si se detectó drag reciente (< 200ms), cancelar click
      if (isDraggingRef.current || timeSinceStart < 200) {
        console.log('Click cancelled due to drag detection');
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      console.log('Executing click action');
      onAction?.();
    },
    [onAction, dragHandlers, canDrag]
  );

  const enhancedDragHandlers =
    canDrag && dragHandlers
      ? {
          onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
            isDraggingRef.current = true;
            dragStartTimeRef.current = Date.now();
            dragHandlers.onPointerDown(e);
          },
          onPointerMove: dragHandlers.onPointerMove,
          onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => {
            // Resetear después de un pequeño delay para prevenir clicks accidentales
            setTimeout(() => {
              isDraggingRef.current = false;
            }, 100);
            dragHandlers.onPointerUp(e);
          },
          onPointerLeave: (e: React.PointerEvent<HTMLDivElement>) => {
            setTimeout(() => {
              isDraggingRef.current = false;
            }, 100);
            dragHandlers.onPointerLeave(e);
          },
          onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => {
            isDraggingRef.current = true;
            dragStartTimeRef.current = Date.now();
            dragHandlers.onTouchStart(e);
          },
          onTouchMove: dragHandlers.onTouchMove,
          onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => {
            setTimeout(() => {
              isDraggingRef.current = false;
            }, 100);
            dragHandlers.onTouchEnd(e);
          },
        }
      : {};

  return (
    <div
      className="drag-hint drag-hint-interactive"
      onClick={handleClick}
      {...enhancedDragHandlers}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {text}
    </div>
  );
};
