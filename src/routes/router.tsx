import { createBrowserRouter } from "react-router-dom";
import { HomePage, Questions, Score } from "../pages";
import { NotFound } from "../pages/404";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <HomePage />,
  },
  { path: "subject/:title", element: <Questions /> },
  { path: "score", element: <Score /> },
]);
