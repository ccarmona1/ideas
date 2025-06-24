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

  const DRAG_THRESHOLD = 15;
  const ACTION_THRESHOLD = 80;
  const DOWNWARD_RESISTANCE = 0.4;

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!canDrag) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      setDragStarted(false);
      startY.current = e.clientY;
      if (elementRef.current) {
        elementRef.current.setPointerCapture(e.pointerId);
      }
    },
    [canDrag]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || startY.current === null) return;
      e.preventDefault();
      e.stopPropagation();
      const deltaY = e.clientY - startY.current;
      const absDelta = Math.abs(deltaY);
      if (!dragStarted && absDelta >= DRAG_THRESHOLD) {
        setDragStarted(true);
        onDragStart?.();
      }
      if (dragStarted) {
        const adjustedDelta =
          deltaY > 0 ? deltaY * DOWNWARD_RESISTANCE : deltaY;
        setDragY(adjustedDelta);
        const opacity = Math.max(0.3, 1 + adjustedDelta / 200);
        onDragMove?.(adjustedDelta, opacity);
      }
    },
    [isDragging, dragStarted, onDragMove, onDragStart]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      e.stopPropagation();
      if (elementRef.current) {
        elementRef.current.releasePointerCapture(e.pointerId);
      }
      if (dragStarted && dragY < -ACTION_THRESHOLD) {
        onAction();
      } else if (!dragStarted) {
        onAction();
      }
      onDragEnd?.();
      setIsDragging(false);
      setDragStarted(false);
      setDragY(0);
      startY.current = null;
    },
    [isDragging, dragStarted, dragY, onAction, onDragEnd]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!dragStarted && !isDragging) {
        e.preventDefault();
        e.stopPropagation();
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

  const opacity = dragStarted ? Math.max(0.3, 1 + dragY / 200) : 1;

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
          : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
