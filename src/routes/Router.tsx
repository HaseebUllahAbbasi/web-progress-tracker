import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/SignUp';
import Home from '../pages/Home';
import HourlyUpdatesPage from '../pages/Hourly';
import DailyCalender from '../pages/DailyCalender';
import ToDo from '../pages/Todo';
import Notes from '../pages/Notes';
import HeaderFooter from '../components/HeaderFooter';
import ProtectedRoute from './ProtectedRoute';


const MainRoutes: React.FunctionComponent = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HeaderFooter>
            <Home />
          </HeaderFooter>} />
          <Route path='/calender' element={<HeaderFooter>
            <DailyCalender />
          </HeaderFooter>} />
          <Route path='/to-do'
            element={<HeaderFooter>
              <ToDo />
            </HeaderFooter>}
          />
          <Route path="/hourly/day" Component={HourlyUpdatesPage} />
          <Route path="/hourly" Component={HourlyUpdatesPage} />
          <Route path="/hourly/:date" element={<HeaderFooter>
            <HourlyUpdatesPage />
          </HeaderFooter>}
          />
          <Route path="/notes" element={<HeaderFooter>
            <Notes />
          </HeaderFooter>} />

        </Route>

        <Route path="/signup" element={<HeaderFooter>
          <Signup />
        </HeaderFooter>} />
        <Route path="/login" element={<HeaderFooter>
          <Login />
        </HeaderFooter>} />


      </Routes>
    </Router>
  );
};

export default MainRoutes;
