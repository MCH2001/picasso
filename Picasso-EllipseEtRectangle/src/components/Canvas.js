import React, { useEffect } from "react";
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";
import Eraser from "./Eraser";

const Canvas = ({ color, lineWidth, mode, style, canvasRef }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let painting = false;

    const startPosition = (e) => {
      painting = true;
      context.beginPath();
      draw(e);
    };

    const endPosition = () => {
      painting = false;
      context.beginPath();
    };

    const draw = (e) => {
      if (!painting) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      context.lineWidth = lineWidth;
      context.lineCap = "round";

      if (mode === "draw") {
        context.strokeStyle = color;
      }

      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.moveTo(x, y);
    };

    const pauseDrawing = () => {
      painting = false;
    };

    const resumeDrawing = (e) => {
      if (e.buttons === 1) {
        painting = true;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        context.moveTo(x, y);
      }
    };

    if (mode === "draw") {
      canvas.addEventListener("mousedown", startPosition);
      canvas.addEventListener("mouseup", endPosition);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseleave", pauseDrawing);
      canvas.addEventListener("mouseenter", resumeDrawing);
    }

    return () => {
      canvas.removeEventListener("mousedown", startPosition);
      canvas.removeEventListener("mouseup", endPosition);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseleave", pauseDrawing);
      canvas.removeEventListener("mouseenter", resumeDrawing);
    };
  }, [canvasRef, color, lineWidth, mode]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={1500}
        height={700}
        style={{ border: "1px solid black", margin: "20px" }}
      />
      {mode === "rectangle" && (
        <Rectangle canvasRef={canvasRef} color={color} style={style} />
      )}
      {mode === "ellipse" && (
        <Ellipse canvasRef={canvasRef} color={color} style={style} />
      )}
      {mode === "eraser" && (
        <Eraser canvasRef={canvasRef} lineWidth={lineWidth} />
      )}
    </div>
  );
};

export default Canvas;
