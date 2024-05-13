import * as React from "react";
import { Drawer } from "antd";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { Menu, MenuItem } from "@mui/material";

export default function SideNavbar() {
  const [open, setOpen] = React.useState(false);
  const { user, logOut } = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openE = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        placement={"left"}
        closable={false}
        onClose={onClose}
        open={open}
        key={"left"}
        style={{ width: "300px" }}
      >
        <div className="flex flex-col gap-5 mt-8">
          <NavLink
            to={`/`}
            className={` relative font-semibold hover:text-gold`}
          >
            Home
          </NavLink>
          <NavLink
            to={`/all-foods`}
            className={` relative font-semibold hover:text-gold`}
          >
            All Foods
          </NavLink>
          <NavLink
            to={`/gallery`}
            className={` relative font-semibold hover:text-gold`}
          >
            Gallery
          </NavLink>
        </div>
        <div className="mt-8">
          {user ? (
            <div className="flex flex-col gap-7 justify-start w-32">
              <button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <img
                  className="w-12 rounded-full"
                  src={user.photoURL}
                  alt={user.displayName}
                  title={user.email}
                />
              </button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openE}
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
            </div>
          ) : (
            <Link
              className="login hover:bg-gold hover:text-white hover:border-gold transition"
              to={`/login`}
            >
              Login
            </Link>
          )}
        </div>
      </Drawer>
      <div>
        <button onClick={showDrawer}>
          <DragHandleIcon className="text-gold hover:text-navi-blue hover:scale-125 transition" />
        </button>
      </div>
    </>
  );
}
