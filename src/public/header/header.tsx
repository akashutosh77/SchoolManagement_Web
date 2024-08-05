import {
  useAuthUserDetailsHook,
  useIsAuthUserLoggedInHook,
} from "hooks/useUserHooks";
import DrawerAppBar from "public/header/drawerAppBar";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { attendanceByTeacher, urlOfTeacherAttendance } from "utils";
import { clearUser, selectUser } from "../../store/slices/authSlice";

const Header: React.FC = () => {
  const userDetails = useAuthUserDetailsHook();
  const isUserLoggedIn = useIsAuthUserLoggedInHook();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<{ [key: string]: boolean }>({
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
  });
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
    navigate("/");
  };
  const handleSchoolNameClick = () => {
    navigate("/");
  };
  const handleMenuClick = (menu: string) => {
    setOpenMenu({ ...openMenu, [menu]: !openMenu[menu] });
    if (menu == attendanceByTeacher) {
      navigate(`private/${urlOfTeacherAttendance}`);
    }
  };
  const handleTopMenuItemClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e.currentTarget.textContent == "Home") {
      navigate("/");
    }
  };

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
      userDetails={userDetails}
    />
  );
};

export default Header;
