import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage(""); 

        const emailPattern = /^[^\s@]+@[^\s@]+\.com$/;


        if (!emailPattern.test(email)) {
            setErrorMessage("Please enter a valid email address ending with '.com'.");
            return;
        }
        
        if (password.includes(" ")) {
            setErrorMessage("Password cannot contain spaces.");
            return;
        }

        
        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                alert("Registration successful");
                navigate("/login");
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || "Registration failed");
            }
        } catch (error) {
            setErrorMessage("An error occurred during registration. Please try again later.");
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
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
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
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
                        Register
                    </button>

                    <p className="text-center mt-3">Already have an account?</p>
                    <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Login
                    </Link>
                </form>

                <div className="text-center mt-3">
                    <Link to="/" className="btn btn-primary">
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
