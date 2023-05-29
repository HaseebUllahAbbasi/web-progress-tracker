import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/SignUp';
import Home from '../pages/Home';
import HourlyUpdatesPage from '../pages/Hourly';


const MainRoutes: React.FunctionComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/signup" Component={Signup} />
        <Route path="/login" Component={Login} />
        <Route path="/hourly/day" Component={HourlyUpdatesPage} />
        <Route path="/hourly" Component={HourlyUpdatesPage} />

      </Routes>
    </Router>
  );
};

export default MainRoutes;
