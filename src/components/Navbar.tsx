import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AppNavbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link className="nav-link" to="/" style={{ color: `${location.pathname === '/' ? "#FF0000" : 'rgba(0, 0, 0, 0.7)'}`, fontWeight: 'bold' }}>Home</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/signup' ? 'active' : ''}`}>
              <Link className="nav-link" to="/signup" style={{ color: `${location.pathname === '/signup' ? "#FF0000" : 'rgba(0, 0, 0, 0.7)'}`, fontWeight: 'bold' }}>Sign Up</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}>
              <Link className="nav-link" to="/login"
                style={{ color: `${location.pathname === '/login' ? "#FF0000" : 'rgba(0, 0, 0, 0.7)'}`, fontWeight: 'bold' }}
              >Login</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/to-do' ? 'active' : ''}`}>
              <Link className="nav-link" to="/to-do" style={{ color: `${location.pathname === '/to-do' ? "#FF0000" : 'rgba(0, 0, 0, 0.7)'}`, fontWeight: 'bold' }}>To Do Task</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/notes' ? 'active' : ''}`}>
              <Link className="nav-link" to="/notes" style={{ color: `${location.pathname === '/notes' ? "#FF0000" : 'rgba(0, 0, 0, 0.7)'}`, fontWeight: 'bold' }}>Notes</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/calender' ? 'active' : ''}`}>
              <Link className="nav-link" to="/calender" style={{ color: `${location.pathname === '/calender' ? "#FF0000" : 'rgba(0, 0, 0, 0.7)'}`, fontWeight: 'bold' }}>Calendar</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/calender' ? 'active' : ''}`}>
              <Link className="nav-link" to="/calender" style={{ color: `'rgba(0, 0, 0, 0.7)'}`, fontWeight: 'bold' }}>Today Update
              </Link>
            </li>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
