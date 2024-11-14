import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setUserEmail }) { // Add setUserEmail prop
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Login successful");
                
                // Store token in localStorage and set the user's email
                localStorage.setItem("token", data.token);
                setUserEmail(email);  // Update user's email in the global state
                navigate("/");  
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || "Login failed");
            }
        } catch (error) {
            setErrorMessage("An error occurred during login. Please try again later.");
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="text"
                            placeholder="Enter email"
                            name="email"
                            className="form-control rounded-8"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            className="form-control rounded-8"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary w-100 mt-3">
                        Login
                    </button>
                </form>
                <div className="text-center mt-3">
                    <Link to="/" className="btn btn-primary">Home</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
