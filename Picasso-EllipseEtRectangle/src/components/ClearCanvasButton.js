import React from "react";
import Button from "@mui/material/Button";

const ClearCanvasButton = ({ clearCanvas }) => (
  <Button
    variant="contained"
    color="secondary"
    onClick={clearCanvas}
    style={{ marginTop: "8px" }}
  >
    Clear Canvas
  </Button>
);

export default ClearCanvasButton;
