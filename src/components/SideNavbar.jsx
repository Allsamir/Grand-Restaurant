import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { Link, NavLink } from "react-router-dom";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

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
        <Link
          className="login hover:bg-gold hover:text-white hover:border-gold transition"
          to={`/login`}
        >
          Login
        </Link>
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
