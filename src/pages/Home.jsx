import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Axios is used here to make HTTP requests to the backend 
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // runs its function once when the component is first rendered
  useEffect(() => {
    const fetchUser = async () => {
        // This defines an asynchronous function fetchUser that will fetch the logged-in user's data from the backend
      const token = localStorage.getItem('token');

      // If no token is found, redirect to login page
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // This sends a GET request to your backend user endpoint with the token in the Authorization header
        // The backend should verify the token and return the user data if valid
        const res = await axios.get('http://localhost:5050/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="home-container">
      <h2>Welcome to Donor Match</h2>
      {user ? (
        <p>Hello, {user.name}! You are logged in as {user.email}.</p>
      ) : (
        <p>Loading your information...</p>
      )}
    </div>
  );
};

export default Home;
