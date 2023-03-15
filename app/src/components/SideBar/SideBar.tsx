import { Link, useLocation } from "react-router-dom";
import "./SideBar.scss";

import DashboardLogo from "../../assets/icons/dashboard.svg";

export const SideBar = () => {
  const location = useLocation();
  return (
    <nav className="side-nav">
      <ul>
        <li className={location.pathname === "/" ||
          location.pathname === "/home" ||
          useLocation().pathname.includes("premium") ||
          useLocation().pathname.includes("private") ? "active" : ""}>
          <Link to="/" className="side-logo">
            <img className="" draggable="false" src={DashboardLogo} />
          </Link>
        </li>
      </ul>
      <ul>
        <li
          className={
            location.pathname === "/server/1" ? "profile active" : "profile"
          }
        >
          <Link to="/server/1">
            <img
              draggable="false"
              src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png"
              alt="logo"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
