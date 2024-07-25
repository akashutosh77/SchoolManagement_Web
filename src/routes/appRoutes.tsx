import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GuestRoute } from "./guestRoute";
import { MemberRoute } from "./memberRoute";
import { Home } from "../public/home/home";
// import About from '../pages/guest/About';
// import Contact from '../pages/guest/Contact';
// import Login from '../pages/guest/Login';
import { Dashboard } from "../private/dashboard";
import Signup from "../public/login/signup";
// import Profile from '../pages/member/Profile';
// import Settings from '../pages/member/Settings';
import Login from "../public/login/login";
import ForgotPassword from "../public/login/forgotPassword";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GuestRoute component={Home} />} />
        <Route path="/login" element={<GuestRoute component={Login} />} />
        <Route path="/signup" element={<GuestRoute component={Signup} />} />
        <Route
          path="/forgotPassword"
          element={<GuestRoute component={ForgotPassword} />}
        />
        {/* <Route path="/about" element={<GuestRoute component={About} />} />
        <Route path="/contact" element={<GuestRoute component={Contact} />} />*/}
        <Route
          path="/dashboard"
          element={<MemberRoute component={Dashboard} />}
        />
        {/* <Route path="/profile" element={<MemberRoute component={Profile} />} />
        <Route path="/settings" element={<MemberRoute component={Settings} />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
