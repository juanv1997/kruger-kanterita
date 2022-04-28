import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Grow from "@mui/material/Grow";

const Input = (props) => {
  const [error, setError] = useState({});

  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  return (
    <TextField
    type={props.type}
      margin="normal"
      fullWidth
      color={error ? (error.isError ? "primary" : "success") : "primary"}
      focused
      disabled={props.disabled === "undefined" ? false : props.disabled}
      label={props.label}
      helperText={error ? error.message : ""}
      error={error ? error.isError : false}
      InputProps={{
        type: props.type === "undefined" ? "text" : props.type,
        id: props.inputId,
        name: props.inputId,
        value: props.value,
        onChange: props.handleChange,
        onBlur: props.handleBlur,
        endAdornment: error ? (
          error.isError ? (
            <InputAdornment>
              <HighlightOffIcon
                sx={{
                  fontSize: 32,
                  color: "#f44336",
                  textAlign: "center",
                }}
              />
            </InputAdornment>
          ) : (
            <InputAdornment>
              <CheckCircleOutlineIcon
                sx={{
                  fontSize: 32,
                  color: "#16A34A",
                }}
              />
            </InputAdornment>
          )
        ) : null,
      }}
    />
  );
};

export default Input;
