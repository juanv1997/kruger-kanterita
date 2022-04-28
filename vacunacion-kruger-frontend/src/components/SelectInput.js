import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Grow from "@mui/material/Grow";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const SelectInput = (props) => {
  const [error, setError] = useState({});
  useEffect(() => {
    setError(props.error);
  }, [props.error]);
  return (
    <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={900}>
      <Grid item xs={props.xs} sm={props.sm} md={props.md}>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <TextField
            disabled={props.disabled === "undefined" ? false : props.disabled}
            fullWidth
            select
            color={error ? (error.isError ? "primary" : "success") : "primary"}
            focused
            defaultValue=""
            label={props.label}
            helperText={error ? error.message : ""}
            error={error ? error.isError : false}
            SelectProps={{
              native: true,
              id: props.inputId,
              name: props.inputId,
              value: props.value,
              onChange: props.handleChange,
              onBlur: props.handleBlur,
            }}
          >
            {props.children}
          </TextField>
          {error ? (
            error.isError ? (
              <Box paddingBottom={3}>
                <HighlightOffIcon
                  sx={{
                    fontSize: 32,
                    color: "#f44336",
                  }}
                />
              </Box>
            ) : (
              <CheckCircleOutlineIcon
                sx={{
                  fontSize: 32,
                  color: "#16A34A",
                }}
              />
            )
          ) : null}
        </Stack>
      </Grid>
    </Grow>
  );
};

export default SelectInput;
