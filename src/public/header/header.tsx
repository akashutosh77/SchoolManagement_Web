import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DrawerAppBar } from "./DrawerAppBar";
import { clearUser, selectUser } from "../../store/slices/authSlice";
import { Dispatch } from "redux";

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleNavItemsBeforeLoginClick = (buttonText: string) => {
    if (buttonText === "Login") {
      navigate("/login");
    }
  };
  const handleNavItemsBeforeLogoutClick = () => {
    dispatch(clearUser());
    navigate('/')
  };
  const handleSchoolNameClick = () => {
    navigate("/");
  };
  useEffect(() => {
    if (user.isLoggedInWithGoogle || user.isLoggedInWithUserNamePassword) {
      setisUserLoggedIn(true);
    }
    else{
        setisUserLoggedIn(false);  
    }
  }, [user]);
  return (
    <DrawerAppBar
      handleDrawerToggle={handleDrawerToggle}
      mobileOpen={mobileOpen}
      handleNavItemsBeforeLoginClick={handleNavItemsBeforeLoginClick}
      handleSchoolNameClick={handleSchoolNameClick}
      isUserLoggedIn={isUserLoggedIn}
      handleNavItemsBeforeLogoutClick={handleNavItemsBeforeLogoutClick}
    />
  );
};

export default Header;
