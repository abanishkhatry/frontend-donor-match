import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/auth/user', {
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
