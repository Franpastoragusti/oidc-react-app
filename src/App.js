import React, { Component } from "react";
import { AuthProvider } from "./providers/authProvider";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes/routes";


export class App extends Component {

  render() {
    return (
      <AuthProvider>
        <BrowserRouter children={Routes} basename={"/"} />
      </AuthProvider>
    );
  }
}
