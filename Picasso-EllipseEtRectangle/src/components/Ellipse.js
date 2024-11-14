import { useState, useEffect, useCallback } from "react";

const Ellipse = ({ canvasRef, color, style }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [canvasImageData, setCanvasImageData] = useState(null);

  const drawEllipse = useCallback(
    (context, x, y, rx, ry, isPreview = false) => {
      context.beginPath();
      context.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);

      if (isPreview) {
        context.setLineDash([5, 3]); // Dashed line for preview
      } else {
        context.setLineDash([]); // Solid line for final drawing
      }

      if (style === "filled" && !isPreview) {
        context.fillStyle = color;
        context.fill();
      } else {
        context.strokeStyle = color;
        context.lineWidth = 1;
        context.stroke();
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

      const centerX = canvasStartX + width / 2;
      const centerY = canvasStartY + height / 2;

      drawEllipse(
        context,
        centerX,
        centerY,
        Math.abs(width / 2),
        Math.abs(height / 2),
        true
      );
    },
    [isDrawing, canvasRef, startPos, currentPos, canvasImageData, drawEllipse]
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

    const centerX = canvasStartX + width / 2;
    const centerY = canvasStartY + height / 2;

    // Draw the final ellipse without clamping
    drawEllipse(
      context,
      centerX,
      centerY,
      Math.abs(width / 2),
      Math.abs(height / 2)
    );

    setIsDrawing(false);
    setCanvasImageData(null);
  }, [
    isDrawing,
    canvasRef,
    startPos,
    currentPos,
    canvasImageData,
    drawEllipse,
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

export default Ellipse;
