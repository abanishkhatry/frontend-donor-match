import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Submit handler
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth/signup', {
        name,
        email,
        password,} , 
        { withCredentials: true }
    );

      // Save token to localStorage
      localStorage.setItem('token', res.data.token);

      // Navigate to home page
      navigate('/');
    } catch (err) {
        console.error('Signup Error:', err);
        if (err.response) {
          console.error('Backend responded with:', err.response.data);
          alert(err.response.data.message || 'Signup failed');
        } else if (err.request) {
          console.error('Request was made but no response:', err.request);
          alert('No response from backend. Check if server is running and CORS is set up.');
        } else {
          console.error('Error setting up request:', err.message);
          alert('Signup failed. Unknown error.');
        }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
