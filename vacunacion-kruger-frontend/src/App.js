import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./themeConfig";
import LoginPage from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import { Route, Routes } from "react-router-dom";
import EmpleadoPage from "./pages/EmpleadoPage";

const Login = () => <LoginPage />;
const Administrador = () => <AdminPage />;
const Empleado = () => <EmpleadoPage />;


function App() {

  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <ThemeProvider theme={theme}>
        <LoginPage />
      </ThemeProvider> */}
        <Route path="/administrador" element={<Administrador />} />
        <Route path="/empleado" element={<Empleado />} />
      </Routes>
   
  );
}
export default App;
