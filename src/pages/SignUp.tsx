import React, { useState } from 'react';
import axios from 'axios';
import { SERVER } from '../constant';
import './TodoList.css';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${SERVER}/api/users`, { username, password, email });

      setUsername('');
      setPassword('');
      setEmail('');
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle the error as needed
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#00416A',
    color: '#fff',
    cursor: 'pointer',
  };

  return (
    <div className="container-custom">
      <div className='shadow-lg p-4' style={{ borderRadius: "20px" }}>
        <h2 className='display-6 text-center' >Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="signup-username">Username</label>
            <input
              type="text"
              id="signup-username"
              className="form-control"
              style={inputStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-password">Password</label>
            <input
              type="password"
              id="signup-password"
              className="form-control"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <input
              type="email"
              id="signup-email"
              className="form-control"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary my-3" style={buttonStyle}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
