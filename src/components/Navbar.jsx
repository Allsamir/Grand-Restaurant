import { Link, NavLink } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import "./navbar.css";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="navbar bg-base-100 py-6">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-xl"
          href="https://grand-resturant-01.web.app"
        >
          <img
            src="https://grandrestaurantv6.b-cdn.net/grandrestaurantv6/demo3/wp-content/uploads/sites/3/2020/12/logo@2x.png"
            alt=""
            width="120"
            height="68"
            loading="lazy"
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
                <button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <img
                    className="w-12 rounded-full inline-block mr-4 ml-3"
                    src={user.photoURL}
                    alt=""
                    loading="lazy"
                    title={user.email}
                  />
                </button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  className="mt-4"
                >
                  <MenuItem onClick={handleClose} className="menu-item">
                    <Link to={`/add-food-items`}>Add Food Items</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} className="menu-item">
                    <Link to={`/my-added-items`}>My Added Food Items</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} className="menu-item">
                    <Link to={`/my-orders`}>My Ordered Food Items</Link>
                  </MenuItem>
                </Menu>
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
