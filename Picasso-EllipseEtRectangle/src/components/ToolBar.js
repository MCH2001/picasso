import React from "react";
import ColorPicker from "./ColorPicker";
import StylePicker from "./StylePicker";
import BrushSizePicker from "./BrushSizePicker";
import ClearCanvasButton from "./ClearCanvasButton";
import BrushIcon from "@mui/icons-material/Brush";
import EraserIcon from "@mui/icons-material/AutoFixOff";
import RectangleIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import EllipseIcon from "@mui/icons-material/RadioButtonUnchecked"; // Use an icon for ellipse

const ToolBar = ({
  color,
  setColor,
  lineWidth,
  setLineWidth,
  eraserLineWidth,
  setEraserLineWidth,
  clearCanvas,
  setMode,
  mode,
  style,
  setStyle,
}) => {
  const toggleBrush = () => setMode("draw");
  const toggleEraser = () => setMode("eraser");
  const toggleRectangle = () => setMode("rectangle");
  const toggleEllipse = () => setMode("ellipse"); // Toggle ellipse mode

  return (
    <div className="toolbar">
      <div className="icon-container">
        <button
          onClick={toggleBrush}
          className={`icon-box ${mode === "draw" ? "active" : ""}`}
        >
          <BrushIcon fontSize="large" />
        </button>
        <button
          onClick={toggleEraser}
          className={`icon-box ${mode === "eraser" ? "active" : ""}`}
        >
          <EraserIcon fontSize="large" />
        </button>
        <button
          onClick={toggleRectangle}
          className={`icon-box ${mode === "rectangle" ? "active" : ""}`}
        >
          <RectangleIcon fontSize="large" />
        </button>
        <button
          onClick={toggleEllipse}
          className={`icon-box ${mode === "ellipse" ? "active" : ""}`}
        >
          <EllipseIcon fontSize="large" />
        </button>
      </div>

      {mode === "draw" && (
        <div className="settings-box">
          <ColorPicker color={color} setColor={setColor} />
          <BrushSizePicker lineWidth={lineWidth} setLineWidth={setLineWidth} />
        </div>
      )}

      {mode === "eraser" && (
        <div className="settings-box">
          <BrushSizePicker
            lineWidth={eraserLineWidth}
            setLineWidth={setEraserLineWidth}
          />
        </div>
      )}
      {mode === "rectangle" && (
        <div className="settings-box">
          <ColorPicker color={color} setColor={setColor} />
          <StylePicker style={style} setStyle={setStyle} />
        </div>
      )}
      {mode === "ellipse" && (
        <div className="settings-box">
          <ColorPicker color={color} setColor={setColor} />
          <StylePicker style={style} setStyle={setStyle} />
        </div>
      )}

      <ClearCanvasButton clearCanvas={clearCanvas} />
    </div>
  );
};

export default ToolBar;
