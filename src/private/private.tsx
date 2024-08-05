import { Card, Container, Typography } from "@mui/material";
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
      <Card sx={{minHeight:500, borderRadius:2, padding:5}}>
      {userDetails?.roleName == ROLES.Super && (
        <Typography>Welcome: {userDetails?.name}</Typography>
      )}

      {userDetails?.roleName == ROLES.Teacher && (
        <Teachers urlAfterPrivate={urlAfterPrivate} userDetails={userDetails}/>
      )}
      </Card>
    </Container>
  );
};
export default Private;
