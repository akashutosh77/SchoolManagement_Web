import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const useURLAfterPrivateHook = () => {
  const location = useLocation()
  const [urlAfterPrivate, setURLAfterPrivate] = useState("")

  useEffect(() => {
    // Extract the part of the URL after "private"
    const pathAfterPrivate = location.pathname.split("/private/")[1]
    setURLAfterPrivate(pathAfterPrivate)
  }, [location.pathname])
  return urlAfterPrivate
}
export default useURLAfterPrivateHook
