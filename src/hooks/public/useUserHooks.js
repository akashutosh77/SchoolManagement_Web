import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, setUser } from "../../store/slices/authSlice"

export const useIsAuthUserLoggedInHook = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const getUserFromStorage = key => {
    const valueJson = localStorage.getItem(key)
    if (valueJson) {
      try {
        return JSON.parse(valueJson)
      } catch (error) {
        console.error("Error parsing JSON from local storage", error)
        return null
      }
    }

    return null
  }

  useEffect(() => {
    const retrievedUser = getUserFromStorage("user")
    if (user.isLoggedInWithGoogle || user.isLoggedInWithUserNamePassword) {
      setIsUserLoggedIn(true)
    } else if (
      retrievedUser &&
      !user.isLoggedInWithGoogle &&
      !user.isLoggedInWithUserNamePassword
    ) {
      dispatch(setUser(retrievedUser))
    } else {
      setIsUserLoggedIn(false)
    }
  }, [user])

  return isUserLoggedIn
}

export const useAuthUserDetailsHook = () => {
  const [authUserDetails, setAuthUserDetails] = useState(null)
  const user = useSelector(selectUser)

  useEffect(() => {
    if (user.isLoggedInWithGoogle || user.isLoggedInWithUserNamePassword) {
      setAuthUserDetails(user)
    } else {
      setAuthUserDetails(null)
    }
  }, [user])

  return authUserDetails
}
