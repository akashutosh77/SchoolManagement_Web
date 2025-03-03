import {
    useAuthUserDetailsHook,
    useIsUserLoggedInHook
  } from "hooks/public/useUserHooks"
  import DrawerAppBar from "public/header/drawerAppBar"
  import * as React from "react"
  import { useState } from "react"
  import { useDispatch, useSelector } from "react-redux"
  import { useNavigate } from "react-router-dom"
  import { attendanceByTeacher, urlOfTeacherAttendance } from "utils"
  import { clearUser, selectUser } from "../../store/slices/authSlice"
  
  const Header = () => {
    const userDetails = useAuthUserDetailsHook()
    const isUserLoggedIn = useIsUserLoggedInHook()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [openMenu, setOpenMenu] = useState({
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false
    })
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleDrawerToggle = () => {
      setMobileOpen(prevState => !prevState)
    }
    const handleNavItemsBeforeLoginClick = buttonText => {
      if (buttonText === "Login") {
        navigate("/login")
      }
    }
    const handleNavItemsBeforeLogoutClick = () => {
      dispatch(clearUser())
      navigate("/")
    }
    const handleSchoolNameClick = () => {
      navigate("/")
    }
    const handleMenuClick = menu => {
      setOpenMenu({ ...openMenu, [menu]: !openMenu[menu] })
      if (menu == attendanceByTeacher) {
        navigate(`private/${urlOfTeacherAttendance}`)
        setMobileOpen(prevState => !prevState)
      }
    }
    const handleTopMenuItemClick = e => {
      if (e.currentTarget.textContent == "Home") {
        navigate("/")
      }
    }
  
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
    )
  }
  
  export default Header
  