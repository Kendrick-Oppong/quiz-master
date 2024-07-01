import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import GlobalStyles from "./styles/GlobalStyles";
import { Header } from "./components";
import { getSelectedThemeMode } from "./redux/features/themeSlice.ts";
import { useAppSelector } from "./redux/hooks.ts";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/themes.ts";

function App() {
  const isDarkMode = useAppSelector(getSelectedThemeMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <div>
        <Header />
        <GlobalStyles />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
