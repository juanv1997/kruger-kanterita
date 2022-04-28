import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  loader: {
    backgroundColor: "white",
    position: "fixed",
    width: "100%",
    height: "100%",
  },
}));

const LoadingPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      <Stack spacing={2} direction="column">
        <CircularProgress color="success" size={60} />
        <Typography variant="h6">Cargando...</Typography>
      </Stack>
    </div>
    // <Backdrop
    //   //sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //   open={true}
    // >
    //   <Stack direction="column" spacing={1} alignItems="center">
    //     <CircularProgress color="inherit" />
    //     <Typography variant="h6">Cargando...</Typography>

    //   </Stack>
    // </Backdrop>
  );
};

export default LoadingPage;
