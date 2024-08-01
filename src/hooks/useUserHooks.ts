import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser, setUser } from "../store/slices/authSlice";
import { IUserState } from "../store/slices/ISlices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

export const useIsAuthUserLoggedInHook = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const retrieveObject = (key: string) => {
    const valueJson = localStorage.getItem(key);
    if (valueJson) {
      try {
        return JSON.parse(valueJson);
      } catch (error) {
        console.error("Error parsing JSON from local storage", error);
        return null;
      }
    }

    return null;
  };

  useEffect(() => {
    const retrievedUser: IUserState = retrieveObject("user");
    if (user.isLoggedInWithGoogle || user.isLoggedInWithUserNamePassword) {
      setIsUserLoggedIn(true);
    } else if (
      retrievedUser &&
      !user.isLoggedInWithGoogle &&
      !user.isLoggedInWithUserNamePassword
    ) {
      dispatch(setUser(retrievedUser));
    } else {
      setIsUserLoggedIn(false);
    }
  }, [user]);

  return isUserLoggedIn;
};

export const useAuthUserDetailsHook = () => {
  const [authUserDetails, setAuthUserDetails] = useState<IUserState | null>(
    null
  );
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.isLoggedInWithGoogle || user.isLoggedInWithUserNamePassword) {
      setAuthUserDetails(user);
    } else {
      setAuthUserDetails(null);
    }
  }, [user]);

  return authUserDetails;
};
