import React from "react";

const ColorPicker = ({ color, setColor }) => (
  <label>
    Color:
    <br />
    <input
      type="color"
      value={color}
      onChange={(e) => setColor(e.target.value)}
    />
  </label>
);

export default ColorPicker;
