/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom";
import Routers from "./routers";
import { GlobalProvider } from "./context/global";
import "./assets/styles/main.sass";

ReactDOM.render(
  <GlobalProvider>
    <Routers />
  </GlobalProvider>,

  document.getElementById("root"),
);
