import React, { useRef, useState } from "react";
import Canvas from "./components/Canvas";
import ToolBar from "./components/ToolBar";
import TopBar from "./components/TopBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";

function App() {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [style, setStyle] = useState("hollow");
  const [userEmail, setUserEmail] = useState("");
  const [mode, setMode] = useState("draw");
  const [eraserLineWidth, setEraserLineWidth] = useState(10);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <TopBar canvasRef={canvasRef} />
              <div className="content">
                <ToolBar
                  color={color}
                  setColor={setColor}
                  lineWidth={lineWidth}
                  setLineWidth={setLineWidth}
                  eraserLineWidth={eraserLineWidth}
                  setEraserLineWidth={setEraserLineWidth}
                  clearCanvas={clearCanvas}
                  setMode={setMode}
                  mode={mode}
                  setStyle={setStyle}
                  style={style}
                />
                <Canvas
                  color={color}
                  lineWidth={mode === "eraser" ? eraserLineWidth : lineWidth}
                  mode={mode}
                  style={style}
                  canvasRef={canvasRef} // Pass canvasRef to Canvas
                />
                {userEmail && (
                  <div
                    style={{
                      position: "fixed",
                      bottom: "10px",
                      right: "10px",
                      backgroundColor: "#333",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    {userEmail}
                  </div>
                )}
              </div>
            </div>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
