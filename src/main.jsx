// START HERE: index.html contains <div id="root">. This file starts the React app.
// Reading order: main.jsx → App.jsx → components.jsx → data.js → Calendar.jsx.
// styles.css controls appearance; the .jsx files describe content and interactions.
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";

// Attach React to that HTML element. BrowserRouter lets components use URL routes.
// StrictMode adds development checks; it does not create an extra visible element.
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
