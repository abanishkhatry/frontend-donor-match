// importing necessary libraries and components
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';



// Login component, This component handles user login
const Login = () => {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Submit handler
  const handleLogin = async (e) => {
    // prevents the default form reload behavior when you click the submit button.
    e.preventDefault();

    try {
    // This sends a POST request to your backend login endpoint with the entered email and password.
      const res = await axios.post('http://localhost:5050/api/auth/login', {
        email,
        password,
      });

      // Save token to localStorage
      localStorage.setItem('test-token', res.data.token);


      // Navigate to home page
      navigate('/');

    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        console.error('Backend says:', err.response.data);
        alert(err.response.data.message || 'Login failed');
      } else {
        alert('Login failed. No response from backend.');
      }

    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

        <p>
        Don't have an account? <Link to="/signup">Sign up here</Link> 
        </p>

    </div>
  );
};

// Exports the Login component so it can be imported and used in your app's router (App.jsx)
export default Login;
