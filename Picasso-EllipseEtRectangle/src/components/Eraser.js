import { useEffect } from "react";

const Eraser = ({ canvasRef, lineWidth }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let erasing = false;

    const startErasing = (e) => {
      erasing = true;
      erase(e); // Start erasing immediately on mousedown
    };

    const stopErasing = () => {
      erasing = false;
      context.beginPath(); // Reset the path after erasing stops
    };

    const erase = (e) => {
      if (!erasing) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Set up erasing style by drawing in white
      context.lineWidth = lineWidth;
      context.lineCap = "round";
      context.strokeStyle = "white";

      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.moveTo(x, y);
    };

    // Attach the event listeners
    canvas.addEventListener("mousedown", startErasing);
    canvas.addEventListener("mousemove", erase);
    window.addEventListener("mouseup", stopErasing); // Use window to detect mouseup outside canvas

    return () => {
      // Cleanup event listeners on component unmount
      canvas.removeEventListener("mousedown", startErasing);
      canvas.removeEventListener("mousemove", erase);
      window.removeEventListener("mouseup", stopErasing);
    };
  }, [canvasRef, lineWidth]);

  return null; // The Eraser component doesn't render anything itself
};

export default Eraser;
