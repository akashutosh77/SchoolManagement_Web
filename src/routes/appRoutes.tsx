import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GuestRoute } from './guestRoute';
import {MemberRoute} from './memberRoute';
import {Home} from '../public/Home/home';
// import About from '../pages/guest/About';
// import Contact from '../pages/guest/Contact';
// import Login from '../pages/guest/Login';
import {Dashboard} from '../private/dashboard';
// import Profile from '../pages/member/Profile';
// import Settings from '../pages/member/Settings';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GuestRoute component={Home} />} />
        {/* <Route path="/about" element={<GuestRoute component={About} />} />
        <Route path="/contact" element={<GuestRoute component={Contact} />} />
        <Route path="/login" element={<GuestRoute component={Login} />} /> */}
        <Route path="/dashboard" element={<MemberRoute component={Dashboard} />} />
        {/* <Route path="/profile" element={<MemberRoute component={Profile} />} />
        <Route path="/settings" element={<MemberRoute component={Settings} />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
