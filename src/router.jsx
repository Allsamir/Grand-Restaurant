import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home/Home";
import AllFoods from "./Pages/AllFoods/AllFoods";
import Gallery from "./Pages/Gallery/Gallery";
import Login from "./Pages/Login/Login";
import ErrorPage from "./Pages/ErrorPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/all-foods", element: <AllFoods /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

export default router;
