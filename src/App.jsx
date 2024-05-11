import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  useEffect(() => {
    let currentRoute = location.pathname;
    if (currentRoute == "/") {
      currentRoute = "";
    }
    const modifiedRoute = currentRoute.replace("/", "|");
    const capitalizedRoute =
      modifiedRoute.charAt(0) +
      " " +
      modifiedRoute.charAt(1).toUpperCase() +
      modifiedRoute.slice(2);
    document.title = `Grand Resturant ${capitalizedRoute}`;
  }, [location]);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
