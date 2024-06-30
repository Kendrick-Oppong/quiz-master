import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/themes.ts";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

const theme = lightTheme;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
