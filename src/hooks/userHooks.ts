import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import { IUserState } from '../store/slices/ISlices';

export const useAuthUserHook = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const user = useSelector(selectUser);
  useEffect(() => {
    console.log('the value of isUserLoggedIn', isUserLoggedIn);
    if (user.isLoggedInWithGoogle || user.isLoggedInWithUserNamePassword) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [user]);

  return isUserLoggedIn;
};

export const useAuthUserDetailsHook = () => {
  const [authUserDetails, setAuthUserDetails] = useState<IUserState|null>(null) 
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.isLoggedInWithGoogle || user.isLoggedInWithUserNamePassword) {
      setAuthUserDetails(user);
    }
    else{
      setAuthUserDetails(null)
    }
  }, [user]);

  return authUserDetails;
};




