import React, { useState } from 'react';
import './App.css';
import { ReactComponent as EditIcon } from './assets/pencil.svg';
import { ReactComponent as DeleteIcon} from './assets/bin.svg';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isRecommendationScreen, setIsRecommendationScreen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ email: '', password: '', confirmPassword: '' });
  const [formData, setFormData] = useState({
    bmi: '',
    bloodPressure: '',
    insulin: '',
    glucose: '',
    diabetes: ''
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // const mockEmail = "test@example.com";
      // const mockPassword = "password123";
    
      // if (loginData.email === mockEmail && loginData.password === mockPassword) {
      //   setIsLoggedIn(true);
      // } else {
      //   alert("Invalid credentials. Please try again.");
      // }
      const response = await fetch('http://localhost:4000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      });

      if (response.ok) {
        alert('Signup successful. Please log in.');
        setIsSigningUp(false);
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  const handleHealthDataChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleHealthDataSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://your-backend-api.com/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // setTimeout(() => {
      //   alert('Simulated data submission successful.');
      //   setIsRecommendationScreen(true);
      // }, 1000); 

      if (response.ok) {
        const data = await response.json();
        alert('Data submitted successfully: ' + JSON.stringify(data));
        setIsRecommendationScreen(true);
      } else {
        alert('Error submitting data');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  if (!isLoggedIn) {
    if (isSigningUp) {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUpSubmit}>
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
            <button onClick={() => setIsSigningUp(false)} style={{ marginTop: '10px' }}>Back to Login</button>
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
          <button onClick={() => setIsSigningUp(true)} style={{ marginTop: '10px' }}>Sign Up</button>
        </header>
      </div>
    );
  }

  if (isRecommendationScreen) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Health Recommendations</h1>
          <div className="recommendation-container">
            <div className="recommendation-box">
              <h2>Previous Health Recommendations</h2>
              <p>Your previous health data and recommendations will appear here.</p>
              <div className="edit-icon-container">
                <EditIcon style={{ width: '24px', height: '24px', cursor: 'pointer', marginRight: '10px' }} />
                <DeleteIcon style={{ width: '24px', height: '24px', cursor: 'pointer' }} />
              </div>
            </div>
            <div className="recommendation-box">
              <h2>Present Health Recommendations</h2>
              <p>Your current health data and recommendations will appear here.</p>
            </div>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Enter your health data</h1>
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
