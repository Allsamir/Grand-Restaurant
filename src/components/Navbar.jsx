import { Link, NavLink } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Tooltip from "@mui/material/Tooltip";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className="navbar bg-base-100 py-6">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="">
          <img
            src="https://grandrestaurantv6.b-cdn.net/grandrestaurantv6/demo3/wp-content/uploads/sites/3/2020/12/logo@2x.png"
            alt=""
            width="120"
            height="68"
          />
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-4 items-center">
          <div className="md:inline-block hidden">
            <NavLink
              to={`/`}
              className={`mx-6 relative nav-link font-semibold`}
            >
              Home
            </NavLink>

            <NavLink
              to={`/all-foods`}
              className={`mx-6 relative nav-link font-semibold`}
            >
              All Foods
            </NavLink>

            <NavLink
              to={`/gallery`}
              className={`mx-6 relative nav-link font-semibold`}
            >
              Gallery
            </NavLink>
            {user ? (
              <>
                <Tooltip title={user.displayName}>
                  <img
                    className="w-12 rounded-full inline-block mr-4 ml-3"
                    src={user.photoURL}
                    alt=""
                  />
                </Tooltip>
                <button
                  onClick={logOut}
                  className="login hover:bg-gold hover:text-white hover:border-gold transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                className="login hover:bg-gold hover:text-white hover:border-gold transition"
                to={`/login`}
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden inline-block">
            <SideNavbar />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
