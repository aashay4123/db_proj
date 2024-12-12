import React, { useState } from "react";
import { isAuth, authenticate } from "../utility/helper";
import { toast } from "react-toastify";
import { postAction } from "../utility/generalServices";
import { useNavigate } from "react-router";
const Home = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postAction("/signin", loginData);

      authenticate(response);
      navigate("/prescriptions");
      toast.success("Login successful");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(
          `Login failed: ${error.response.data.message || "Please try again."}`,
        );
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An error occurred: " + error.message);
      }
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      if (response.ok) {
        toast.success("Signup successful. Please log in.");
        setIsSigningUp(false);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  console.log(isAuth());
  if (!isAuth()) {
    if (isSigningUp) {
      return (
        <div className="App">
          <header className="App-header animate-fade">
            <form onSubmit={handleSignUpSubmit} className="form animate-slide">
              <h1 className="form-header">Sign Up</h1>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={signUpData.name}
                  onChange={handleSignUpChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <div className="password-wrapper">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={signUpData.confirmPassword}
                  onChange={handleSignUpChange}
                  required
                />
              </div>
              <div className="button-group">
                <button type="submit" className="btn-primary">
                  Sign Up
                </button>
                <button
                  onClick={() => setIsSigningUp(false)}
                  className="btn-secondary"
                >
                  Back to Login
                </button>
              </div>
            </form>
          </header>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header animate-fade">
          <h1>Login</h1>
          <form onSubmit={handleLoginSubmit} className="form animate-slide">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <div className="password-wrapper">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? "🙈" : "👁"}
                </button>
              </div>
            </div>
            <div className="button-group">
              <button type="submit" className="btn-primary">
                Login
              </button>
              <button
                onClick={() => setIsSigningUp(true)}
                className="btn-secondary"
              >
                Sign Up
              </button>
            </div>
          </form>
        </header>
      </div>
    );
  } else {
    navigate("/prescriptions");
  }
};

export default Home;
