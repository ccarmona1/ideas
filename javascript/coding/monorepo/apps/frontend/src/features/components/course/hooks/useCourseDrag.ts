import { useCallback, useState } from 'react';

export interface UseCourseDragResult {
  containerDragY: number;
  containerOpacity: number;
  isContainerDragging: boolean;
  handleContainerDragStart: () => void;
  handleContainerDragMove: (deltaY: number, opacity: number) => void;
  handleContainerDragEnd: () => void;
}

export function useCourseDrag(): UseCourseDragResult {
  const [containerDragY, setContainerDragY] = useState(0);
  const [containerOpacity, setContainerOpacity] = useState(1);
  const [isContainerDragging, setIsContainerDragging] = useState(false);

  const handleContainerDragStart = useCallback(() => {
    setIsContainerDragging(true);
  }, []);

  const handleContainerDragMove = useCallback(
    (deltaY: number, opacity: number) => {
      setContainerDragY(deltaY);
      setContainerOpacity(opacity);
    },
    []
  );

  const handleContainerDragEnd = useCallback(() => {
    setIsContainerDragging(false);
    setContainerDragY(0);
    setContainerOpacity(1);
  }, []);

  return {
    containerDragY,
    containerOpacity,
    isContainerDragging,
    handleContainerDragStart,
    handleContainerDragMove,
    handleContainerDragEnd,
  };
}
