import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/themes.ts";

const theme = lightTheme;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
