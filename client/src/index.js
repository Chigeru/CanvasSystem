import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "./styles/styling.scss";
import "./styles/navigation.scss";
import "./styles/mysitestyling.scss";
import "./styles/controlsite.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

import "easymde/dist/easymde.min.css";

import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
