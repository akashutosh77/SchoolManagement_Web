import { Card, Container, Typography } from "@mui/material";
import useMasterDataHook from "hooks/private/useMasterDataHook";
import useURLAfterPrivateHook from "hooks/private/useURLAfterPrivateHook";
import { useAuthUserDetailsHook } from "../hooks/public/useUserHooks";
import { ROLES } from "../utils";
import AdministratorRole from "./roles/administratorRole/administratorRole";
import TeachersRole from "./roles/teachersRole/teachersRole";

const Private = () => {
  const urlAfterPrivate = useURLAfterPrivateHook();
  const userDetails = useAuthUserDetailsHook();
  const masterData = useMasterDataHook();
  
  return (
    <Container maxWidth="md">
      <Card sx={{ minHeight: 500, borderRadius: 2, padding: 5 }}>
        {userDetails?.roleName === ROLES.Super && (
          <Typography>Welcome: {userDetails?.name}</Typography>
        )}

        {userDetails?.roleName === ROLES.Teacher && (
          <TeachersRole
            urlAfterPrivate={urlAfterPrivate}
            userDetails={userDetails}
            masterData={masterData}
          />
        )}
        {userDetails?.roleName === ROLES.Administrator && (
          <AdministratorRole
            urlAfterPrivate={urlAfterPrivate}
            userDetails={userDetails}
            masterData={masterData}
          />
        )}
      </Card>
    </Container>
  );
};

export default Private;
