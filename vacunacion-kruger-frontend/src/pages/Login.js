import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Input from "../components/Input";
import krugerImg from "../assets/img/kruger.jpg";
import usuarioService from "../services/usuario.service";
import {
  isEmpty,
  isNumber,
  isEmail,
  isCedula,
  varExists,
  maxLength,
  minLength,
} from "../utils/validation.utils";

const errorMessages = {
  existErrors:"Existen errores en algún campo",
  emptyFields:"Debe ingresar valores en los campos",
  wrongCredentials:"Usuario o clave incorrecta"
 };

const LoginPage = () => {
  const [errorFields, setErrorFields] = useState({});
  const [form, setForm] = useState({});
  const [messageError, setMessageError] = useState({
    error:false,
    errorMessage:null
  });
  

  const validationField = (fieldName, fieldValue) => {
    let error = {
      isError: false,
      message: null,
    };
    let field = {
      name: fieldName,
      value: fieldValue,
    };

    let _isEmpty = isEmpty(field.value);

    if (!_isEmpty.isError) {
      if (field.name === "email") {
        let _isEmail = isEmail(field.value);
        error.isError = _isEmail.isError;
        error.message = _isEmail.message;
      }
    } else {
      error.isError = _isEmpty.isError;
      error.message = _isEmpty.message;
    }

    setErrorFields({
      ...errorFields,
      [field.name]: {
        isError: error.isError,
        message: error.message,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (varExists(errorFields.email) && varExists(errorFields.clave)) {
      if (!errorFields.email.isError && !errorFields.clave.isError) {
        let _usuarioService = new usuarioService();
        let response = await _usuarioService.login(form);
        if(response.data === "OK"){
            console.log("todo blen");

        }
        else{
          setMessageError({
            error:true,
            errorMessage:errorMessages.wrongCredentials
          })
        }
      } else {
        setMessageError({
          error:true,
          errorMessage:errorMessages.existErrors
        })
      }
    } else {
      setMessageError({
        error:true,
        errorMessage:errorMessages.emptyFields
      })
    }
  };

  const handleBlur = (e) => {
    validationField(e.target.name, e.target.value);
  };

  const handleFieldChange = (e) => {
    let field = {
      name: e.target.name,
      value: e.target.value,
    };

    validationField(field.name, field.value);

    setForm({
      ...form,
      [field.name]: field.value,
    });
  };

  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={krugerImg} />
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        {messageError.error && (
          <Alert sx={{ width: "100%" }} spacing={2} severity="error">
            {messageError.errorMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Input
            type="text"
            inputId="email"
            label="Email"
            handleBlur={handleBlur}
            handleChange={handleFieldChange}
            error={varExists(errorFields.email) ? errorFields.email : null}
          />

          <Input
            type="password"
            inputId="clave"
            label="Contraseña"
            handleBlur={handleBlur}
            handleChange={handleFieldChange}
            error={varExists(errorFields.clave) ? errorFields.clave : null}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
