import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { LoginUser } from '../store/UserActions';
import { SERVER } from '../constant';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Login: React.FunctionComponent = () => {
  const userLogin = useSelector((state: StateType) => state);

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send login request to the backend API
      const response = await axios.post(SERVER + '/api/users/login', { username, password });
      const user: SessionUser = (response.data)
      // dispatch(LoginUser(user._id, user.email, user.username))
      // Reset the form fields
      console.log(user)
      dispatch(LoginUser(user._id, user.email, user.username))

      setPassword('');
      setPassword('');
      navigate('/hourly')

    } catch (error) {
      console.error('Error logging in:', error);
      // Handle the error as needed
    }
  };

  const loginContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to top left, #00ff99, #ff66cc)',
  };




  const formContainerStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
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
    <div style={loginContainerStyle}>
      <div style={formContainerStyle}>
        <h2>Login</h2>
        {JSON.stringify(userLogin)}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              type="text"
              id="login-email"
              className="form-control"
              style={inputStyle}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              className="form-control"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={buttonStyle}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
