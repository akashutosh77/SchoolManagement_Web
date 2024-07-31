import React, { useEffect, useState } from "react";
import {useAuthUserDetailsHook} from "../hooks/useUserHooks";
import { Typography } from "@mui/material";
import { ROLES } from "../utils";
const Private: React.FC = () => {
    const userDetails = useAuthUserDetailsHook()
  return (<>
  {
    userDetails?.roleName==ROLES.Super && (
    <Typography>Welcome: {userDetails?.name}</Typography>  
    )
  }

  
  </>)
};
export default Private;
