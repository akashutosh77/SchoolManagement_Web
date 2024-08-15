import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMasterData } from "store/actions/masterDataActions";
import { selectMasterData } from "store/slices/masterDataSlice";
import { AppDispatch } from "../../store";
import {
  useAuthUserDetailsHook,
  useIsAuthUserLoggedInHook,
} from "../public/useUserHooks";
const useMasterDataHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const masterData = useSelector(selectMasterData);
  const isUserLoggedIn = useIsAuthUserLoggedInHook();
  const userDetails = useAuthUserDetailsHook();

  useEffect(() => {
    if (isUserLoggedIn && userDetails) {
      dispatch(getMasterData({ schoolId: userDetails.schoolId! }));
    }
  }, [isUserLoggedIn, userDetails]);
  return masterData;
};
export default useMasterDataHook;
