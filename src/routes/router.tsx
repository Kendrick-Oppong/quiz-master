import { createBrowserRouter } from "react-router-dom";
import { HomePage, Questions, Score } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <p> Not found</p>,
    element: <HomePage />,
  },
  { path: "subject/:title", element: <Questions /> },
  { path: "score", element: <Score /> },
]);
