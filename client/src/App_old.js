import React, { useState } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (!isLoggedIn) {
    if (isSigningUp) {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUpSubmit}>
              <div>
                <label>Name:</label>
                <input
                  name="name"
                  placeholder="Enter your Name"
                  value={signUpData.name}
                  onChange={handleSignUpChange}
                  required
                />
              </div>
              <div>
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
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                  required
                />
              </div>
              <div>
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
              <button type="submit">Sign Up</button>
            </form>
            <button
              onClick={() => setIsSigningUp(false)}
              style={{ marginTop: "10px" }}
            >
              Back to Login
            </button>
          </header>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>Login</h1>
          <form onSubmit={handleLoginSubmit}>
            <div>
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
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <button
            onClick={() => setIsSigningUp(true)}
            style={{ marginTop: "10px" }}
          >
            Sign Up
          </button>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>HealthCare Recommendations</h1>
        <form onSubmit={handleHealthDataSubmit}>
          <div>
            <label>BMI:</label>
            <input
              type="text"
              name="bmi"
              placeholder="Enter BMI"
              value={formData.bmi}
              onChange={handleHealthDataChange}
              required
            />
          </div>
          <div>
            <label>Blood Pressure:</label>
            <input
              type="text"
              name="bloodPressure"
              placeholder="Enter Blood Pressure"
              value={formData.bloodPressure}
              onChange={handleHealthDataChange}
              required
            />
          </div>
          <div>
            <label>Insulin:</label>
            <input
              type="text"
              name="insulin"
              placeholder="Enter Insulin Level"
              value={formData.insulin}
              onChange={handleHealthDataChange}
              required
            />
          </div>
          <div>
            <label>Glucose:</label>
            <input
              type="text"
              name="glucose"
              placeholder="Enter Glucose Level"
              value={formData.glucose}
              onChange={handleHealthDataChange}
              required
            />
          </div>
          <div>
            <label>Diabetes:</label>
            <input
              type="text"
              name="diabetes"
              placeholder="Enter Diabetes Info"
              value={formData.diabetes}
              onChange={handleHealthDataChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
