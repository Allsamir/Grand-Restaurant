import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { Link, NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { AuthContext } from "../Provider/AuthProvider";

export default function SideNavbar() {
  const [open, setOpen] = React.useState(false);
  const { user, logOut } = React.useContext(AuthContext);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="flex flex-col gap-5 mt-8">
        <NavLink
          to={`/`}
          className={`mx-6 relative font-semibold hover:text-gold`}
        >
          Home
        </NavLink>
        <NavLink
          to={`/all-foods`}
          className={`mx-6 relative font-semibold hover:text-gold`}
        >
          All Foods
        </NavLink>
        <NavLink
          to={`/gallery`}
          className={`mx-6 relative font-semibold hover:text-gold`}
        >
          Gallery
        </NavLink>
      </div>
      <div className="ml-5 mt-8">
        {user ? (
          <div className="flex flex-col w-32 gap-4">
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
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <DragHandleIcon className="text-gold" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
