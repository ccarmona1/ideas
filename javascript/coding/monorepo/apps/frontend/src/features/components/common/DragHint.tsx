import React from 'react';

export interface DragHintProps {
  text: string;
  onAction?: () => void;
  dragHandlers?: {
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerUp: (e?: React.PointerEvent<HTMLDivElement>) => void;
    onPointerLeave: (e?: React.PointerEvent<HTMLDivElement>) => void;
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
    onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
    onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
  };
  canDrag?: boolean;
}

export const DragHint: React.FC<DragHintProps> = ({
  text,
  onAction,
  dragHandlers,
  canDrag = true,
}) => {
  return (
    <div
      className="drag-hint drag-hint-interactive"
      onClick={onAction}
      onPointerDown={
        canDrag && dragHandlers ? dragHandlers.onPointerDown : undefined
      }
      onPointerMove={
        canDrag && dragHandlers ? dragHandlers.onPointerMove : undefined
      }
      onPointerUp={
        canDrag && dragHandlers ? dragHandlers.onPointerUp : undefined
      }
      onPointerLeave={
        canDrag && dragHandlers ? dragHandlers.onPointerLeave : undefined
      }
      onTouchStart={
        canDrag && dragHandlers ? dragHandlers.onTouchStart : undefined
      }
      onTouchMove={
        canDrag && dragHandlers ? dragHandlers.onTouchMove : undefined
      }
      onTouchEnd={canDrag && dragHandlers ? dragHandlers.onTouchEnd : undefined}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onAction?.();
        }
      }}
    >
      {text}
    </div>
  );
};
