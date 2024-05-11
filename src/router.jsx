import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home/Home";
import AllFoods from "./Pages/AllFoods/AllFoods";
import Gallery from "./Pages/Gallery/Gallery";
import Login from "./Pages/Login/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorPage from "./Pages/ErrorPage";
import Register from "./Pages/Register/Register";
import AddFoodItem from "./Pages/AddFoodItrem/AddFoodItem";
import PrivateRoute from "./Private/PrivateRoute";
import SingleFoodCard from "./components/SingleFoodCard";
const queryClient = new QueryClient();
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
      {
        path: "/all-foods",
        element: (
          <QueryClientProvider client={queryClient}>
            <AllFoods />
          </QueryClientProvider>
        ),
      },
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
      {
        path: "/food/:foodID",
        element: (
          <QueryClientProvider client={queryClient}>
            <SingleFoodCard />
          </QueryClientProvider>
        ),
      },
    ],
  },
]);

export default router;
