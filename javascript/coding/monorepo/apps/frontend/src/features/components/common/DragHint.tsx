import React from 'react';
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
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onAction?.();
    }
  };

  const conditionalHandlers =
    canDrag && dragHandlers
      ? {
          onPointerDown: dragHandlers.onPointerDown,
          onPointerMove: dragHandlers.onPointerMove,
          onPointerUp: dragHandlers.onPointerUp,
          onPointerLeave: dragHandlers.onPointerLeave,
          onTouchStart: dragHandlers.onTouchStart,
          onTouchMove: dragHandlers.onTouchMove,
          onTouchEnd: dragHandlers.onTouchEnd,
        }
      : {};

  return (
    <div
      className="drag-hint drag-hint-interactive"
      onClick={onAction}
      {...conditionalHandlers}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {text}
    </div>
  );
};
