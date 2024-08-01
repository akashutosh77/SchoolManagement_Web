import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser, selectUser } from "../../store/slices/authSlice";
import DrawerAppBar from "public/header/drawerAppBar";


const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<{ [key: string]: boolean }>({
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
  });
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
  const handleMenuClick = (menu: string) => {
    setOpenMenu({ ...openMenu, [menu]: !openMenu[menu] });
  };
  const handleTopMenuItemClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    if(e.currentTarget.textContent=="Home"){navigate('/')}
  }
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
      handleMenuClick={handleMenuClick}
      openMenu={openMenu}
      handleTopMenuItemClick={handleTopMenuItemClick}
    />
  );
};

export default Header;
