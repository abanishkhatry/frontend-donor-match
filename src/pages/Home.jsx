import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Axios is used here to make HTTP requests to the backend 
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [slogan, setSlogan] = useState(null); 

  // runs its function once when the component is first rendered
  useEffect(() => {
    const fetchUser = async () => {
      // This defines an asynchronous function fetchUser that will fetch the logged-in user's data from the backend
      const token = localStorage.getItem('test-token');
      console.log('Token found:', token); 

      // If no token is found, redirect to login page
      if (!token) {
        console.log('No token, redirecting to login');
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
        console.log('User fetched:', res.data);
        setUser(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    const fetchSlogan = async() => {
      try {
        const res = await axios.get('http://localhost:5050/api/slogan'); 
        setSlogan(res.data.slogan);
      }
      catch (err){
        console.log("Slogan error:", err);
      }
    }

    fetchUser();
    fetchSlogan(); 

  }, [navigate]);

  return (
    <div className="home-container">

    
      <h2>Welcome to Donor Match</h2>
      {user ? (
        <p>Hello, {user.name}! You are logged in as {user.email}.</p>
      ) : (
        <p>Loading your information...</p>
      )}
      <h3 style={{ color: 'darkred', fontStyle: 'italic' }}> {slogan} </h3>
      <button onClick={() => navigate('/donor-form')}> Become a Donor </button>
      <br/>
      <button > Find Blood </button>

    </div>

  );
}

export default Home;
