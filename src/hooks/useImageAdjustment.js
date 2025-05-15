import { useState, useEffect, useCallback } from 'react';

const useImageAdjustment = () => {
  const [scale, setScale] = useState(1.5);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartPosition({
      x: e.clientX,
      y: e.clientY
    });
    setStartDragPosition({
      x: position.x,
      y: position.y
    });
  }, [position]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPosition.x;
    const deltaY = e.clientY - startPosition.y;
    
    setPosition({
      x: startDragPosition.x + deltaX,
      y: startDragPosition.y + deltaY
    });
  }, [isDragging, startPosition, startDragPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return {
    scale,
    setScale,
    position,
    setPosition,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
};

export default useImageAdjustment;