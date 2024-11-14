import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const TopBar = ({ canvasRef }) => {
  const handleShare = async () => {
    if (!canvasRef.current) return;

    const recipientEmail = window.prompt(
      "Enter the destination email address:"
    );
    if (!recipientEmail) {
      alert("Email address is required to share the drawing.");
      return;
    }

    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL("image/png");

    const emailData = {
      to: recipientEmail,
      subject: "Here’s a drawing from PICASSO 1.0!",
      text: "Here is the drawing you requested.",
      html: `<p>Look at my masterpiece!</p><img src="${imageData}" alt="Drawing" />`,
    };

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <div className="top-bar">
      <div className="app-name">PICASSO 1.0</div>
      <div className="buttons">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/Signup"
        >
          Profile
        </Button>
        <Button variant="contained" color="primary" onClick={handleShare}>
          Share
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
