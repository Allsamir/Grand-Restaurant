import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home/Home";
import AllFoods from "./Pages/AllFoods/AllFoods";
import Gallery from "./Pages/Gallery/Gallery";
import Login from "./Pages/Login/Login";
import ErrorPage from "./Pages/ErrorPage";
import Register from "./Pages/Register/Register";
import AddFoodItem from "./Pages/AddFoodItrem/AddFoodItem";
import PrivateRoute from "./Private/PrivateRoute";
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
      { path: "register", element: <Register /> },
      {
        path: "/add-food-items",
        element: (
          <PrivateRoute>
            <AddFoodItem />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
