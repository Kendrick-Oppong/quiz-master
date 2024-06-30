import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <div>
      <GlobalStyles />
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
