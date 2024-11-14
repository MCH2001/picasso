import { useState, useEffect, useCallback } from "react";

const Rectangle = ({ canvasRef, color, style }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [canvasImageData, setCanvasImageData] = useState(null);

  const drawRectangle = useCallback(
    (context, x, y, width, height, isPreview = false) => {
      if (isPreview) {
        context.setLineDash([5, 3]); // Dashed line for preview
      } else {
        context.setLineDash([]); // Solid line for final drawing
      }

      if (style === "filled" && !isPreview) {
        context.fillStyle = color;
        context.fillRect(x, y, width, height);
      } else {
        context.strokeStyle = color;
        context.lineWidth = 1;
        context.strokeRect(x, y, width, height);
      }
    },
    [color, style]
  );

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault(); // Prevent default behavior on mousedown
      // Store the start position in window coordinates
      setStartPos({ x: e.clientX, y: e.clientY });
      setCurrentPos({ x: e.clientX, y: e.clientY });

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Save the current canvas state for preview restoration
      setCanvasImageData(
        context.getImageData(0, 0, canvas.width, canvas.height)
      );

      setIsDrawing(true);
    },
    [canvasRef]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDrawing) return;

      // Update current position with window coordinates
      setCurrentPos({ x: e.clientX, y: e.clientY });

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (canvasImageData) {
        context.putImageData(canvasImageData, 0, 0);
      }

      // Convert window coordinates to canvas-relative coordinates for drawing
      const rect = canvas.getBoundingClientRect();
      const canvasStartX = startPos.x - rect.left;
      const canvasStartY = startPos.y - rect.top;
      const canvasCurrentX = currentPos.x - rect.left;
      const canvasCurrentY = currentPos.y - rect.top;

      const width = canvasCurrentX - canvasStartX;
      const height = canvasCurrentY - canvasStartY;

      drawRectangle(context, canvasStartX, canvasStartY, width, height, true);
    },
    [isDrawing, canvasRef, startPos, currentPos, canvasImageData, drawRectangle]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (canvasImageData) {
      context.putImageData(canvasImageData, 0, 0);
    }

    // Convert window coordinates to canvas-relative coordinates for the final draw
    const rect = canvas.getBoundingClientRect();
    const canvasStartX = startPos.x - rect.left;
    const canvasStartY = startPos.y - rect.top;
    const canvasCurrentX = currentPos.x - rect.left;
    const canvasCurrentY = currentPos.y - rect.top;

    const width = canvasCurrentX - canvasStartX;
    const height = canvasCurrentY - canvasStartY;

    // Draw the final rectangle without clamping
    drawRectangle(context, canvasStartX, canvasStartY, width, height);

    setIsDrawing(false);
    setCanvasImageData(null);
  }, [
    isDrawing,
    canvasRef,
    startPos,
    currentPos,
    canvasImageData,
    drawRectangle,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove); // Track mouse move globally
    window.addEventListener("mouseup", handleMouseUp); // Track mouse up globally

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, canvasRef]);

  return null; // This component doesn't render anything directly
};

export default Rectangle;
