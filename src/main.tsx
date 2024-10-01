import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";
// src/index.js
import { worker } from "./mocks/browser.js";
import { BrowserRouter } from "react-router-dom";
// if (process.env.NODE_ENV === "development") {
worker.start();
// }

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
