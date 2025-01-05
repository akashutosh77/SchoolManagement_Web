import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMasterData } from "store/actions/masterDataActions"
import { selectMasterData } from "store/slices/masterDataSlice"
import {
  useAuthUserDetailsHook,
  useIsUserLoggedInHook
} from "../public/useUserHooks"
const useMasterDataHook = () => {
  const dispatch = useDispatch()
  const masterData = useSelector(selectMasterData)
  const isUserLoggedIn = useIsUserLoggedInHook()
  const userDetails = useAuthUserDetailsHook()

  useEffect(() => {
    if (isUserLoggedIn && userDetails) {
      dispatch(getMasterData({ schoolId: userDetails.schoolId }))
    }
  }, [isUserLoggedIn, userDetails])
  return masterData
}
export default useMasterDataHook
