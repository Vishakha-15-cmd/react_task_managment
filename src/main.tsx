// ============================================================
// APPLICATION ENTRY POINT
// Mounts React, routing, and global CSS.
// ============================================================
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
// @ts-expect-error CSS side-effect imports are handled by the bundler.
import "./styles/index.css";

// ==================== REACT ROOT ====================
createRoot(document.getElementById("root")!).render(
  // React development checks
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
