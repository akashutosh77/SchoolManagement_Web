import React, { useEffect, useState } from "react";
import {useAuthUserDetailsHook} from "../hooks/useUserHooks";
const Private: React.FC = () => {
    const userDetails = useAuthUserDetailsHook()
  return (<>
  
  Welcome: {userDetails?.name}
  
  </>)
};
export default Private;
