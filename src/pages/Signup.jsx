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
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
      });

      // Save token to localStorage
      localStorage.setItem('token', res.data.token);

      // Navigate to home page
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
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
