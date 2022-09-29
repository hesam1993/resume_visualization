
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <div className="navbar">
        <ul>
          <Link to="/">
            <li className="active">Home</li>
          </Link>
          {/* <Link to="/positions">
            <li>Positions</li>
          </Link> */}
          {/* <Link to="/candidates">
            <li>Candidates</li>
          </Link> */}
        </ul>
      </div>
      <Outlet />
    </>
  );
}

export default Navigation;
