import { Grid, Box } from "@mui/material";
import React from "react";
import { HomeCarousel } from "./homeCarousel";
import { Mission } from "./mission";
import { Vision } from "./vision";
import { Focus } from "./focus";

export const Home: React.FC = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <HomeCarousel />
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        spacing={2}
      >
        <Grid item xs={11} sm={4} md={4} lg={4}>
          <Mission />
        </Grid>
        <Grid item xs={11} sm={4} md={4} lg={4}>
          <Vision />
        </Grid>
        <Grid item xs={11} sm={4} md={4} lg={4}>
          <Focus />
        </Grid>
      </Grid>
    </Grid>
  );
};
