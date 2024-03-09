import { NavLink, Outlet } from 'react-router-dom';
import { logContext } from "./Context";
import { useContext } from "react";
import '../styles/NavUser.css'


export const NavUser = () => {

  const { logout, userId } = useContext(logContext);

  return (
    <div>
      <nav className="navbar">
        <h2 className='logo'>Maruti Fiber</h2>
        <ul className="nav-links">
        <li>
            <NavLink to="/"  className="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="active">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="active">
              Contact
            </NavLink>
          </li>
        </ul>
        <form>
            <button
              className="logout-btn"
              onClick={logout}
              type="button"
            >
              Logout
            </button>
        </form>
      </nav>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}
