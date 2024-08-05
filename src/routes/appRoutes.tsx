import { Home } from "public/home/home";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { GuestRoute } from "./guestRoute";
import { MemberRoute } from "./memberRoute";
// import About from '../pages/guest/About';
// import Contact from '../pages/guest/Contact';
// import Login from '../pages/guest/Login';
import { Dashboard } from "../private/dashboard";
import Signup from "../public/login/signup";
// import Profile from '../pages/member/Profile';
// import Settings from '../pages/member/Settings';
import { urlOfTeacherAttendance } from "utils";
import { useIsAuthUserLoggedInHook } from "../hooks/useUserHooks";
import Private from "../private/private";
import ForgotPassword from "../public/login/forgotPassword";
import Login from "../public/login/login";

const AppRoutes: React.FC = () => {
  const isUserLoggedIn = useIsAuthUserLoggedInHook();
  return (
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
        path="/private"
        element={
          <MemberRoute component={Private} isUserLoggedIn={isUserLoggedIn} />
        }
      />
      <Route
        path={`/private/${urlOfTeacherAttendance}`}
        element={
          <MemberRoute component={Private} isUserLoggedIn={isUserLoggedIn} />
        }
      />
      <Route
        path="/dashboard"
        element={
          <MemberRoute component={Dashboard} isUserLoggedIn={isUserLoggedIn} />
        }
      />
      {/* <Route path="/profile" element={<MemberRoute component={Profile} />} />
        <Route path="/settings" element={<MemberRoute component={Settings} />} /> */}
    </Routes>
  );
};

export default AppRoutes;
