import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { LoginUser } from '../store/UserActions';
import { SERVER } from '../constant';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import './TodoList.css';

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
      navigate('/')

    } catch (error) {
      console.error('Error logging in:', error);
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
      <div className='shadow-lg p-4' style={{ borderRadius: "20px" }}  >
        <h2 className='display-6 text-center'>Login</h2>
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
          <button type="submit" className="btn btn-primary my-3" style={buttonStyle}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
