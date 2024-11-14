import React from "react";

const BrushSizePicker = ({ lineWidth, setLineWidth }) => (
  <label>
    Size:
    <input
      type="range"
      min="1"
      max="200"
      value={lineWidth}
      onChange={(e) => setLineWidth(e.target.value)}
    />
  </label>
);

export default BrushSizePicker;
