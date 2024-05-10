import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
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
          <NavLink to={`/`} className={`mx-6 relative nav-link font-semibold`}>
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
          <Link
            className="login hover:bg-[#cfa670] hover:text-white hover:border-[#cfa670] transition"
            to={`/login`}
          >
            Login
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;