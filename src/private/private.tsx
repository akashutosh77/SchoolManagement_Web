import React, { useEffect, useState } from "react";
import {useAuthUserDetailsHook} from "../hooks/userHooks";
const Private: React.FC = () => {
    const userDetails = useAuthUserDetailsHook()
  return (<>
  
  Welcome: {userDetails?.name}
  
  </>)
};
export default Private;
