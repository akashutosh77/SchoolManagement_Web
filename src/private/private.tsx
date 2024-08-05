import { Container, Typography } from "@mui/material";
import useURLAfterPrivateHook from "hooks/useURLAfterPrivateHook";
import React from "react";
import { useAuthUserDetailsHook } from "../hooks/useUserHooks";
import { ROLES } from "../utils";
import Teachers from "./teachers/teachers";
const Private: React.FC = () => {
  const urlAfterPrivate = useURLAfterPrivateHook();
  const userDetails = useAuthUserDetailsHook();
  return (
    <Container maxWidth="md">
      {userDetails?.roleName == ROLES.Super && (
        <Typography>Welcome: {userDetails?.name}</Typography>
      )}

      {userDetails?.roleName == ROLES.Teacher && (
        <Teachers urlAfterPrivate={urlAfterPrivate} userDetails={userDetails}/>
      )}
    </Container>
  );
};
export default Private;
