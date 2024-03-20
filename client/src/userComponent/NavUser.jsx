import { NavLink, Outlet } from 'react-router-dom';
import { logContext } from "./Context";
import { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import axios from 'axios';
import '../styles/NavUser.css'


export const NavUser = () => {
  const [data, setData] = useState([])
  const { logout, userId } = useContext(logContext);

  useEffect(()=> {
    axios
      .get("http://localhost:3030/getAllCartItemQuantity")
      .then(res => setData(res.data[0]))
      .catch(error => console.log(error))
  }, [])

  return (
    <div>
      <nav className="navbar">
        <h2 className='logo'>Maruti Fiber</h2>
        <ul className="nav-links">
        <li>
            <NavLink to={`/home/${userId}`}  className="active">
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
          <li className='service-dropdown'>
            <NavLink to={`/home/${userId}/serviceList`} className="active">
              Services
            </NavLink>
            <ul className="dropdown-menu">
              <li>
                <NavLink to={`/home/${userId}/serviceList`} className="dropdown-item">
                  All Services
                </NavLink>
              </li>
              <li>
                <NavLink to={`/home/${userId}/serviceCart`} className="dropdown-item">
                  Service Cart
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
        <div className='cart-btns'>
          <div className='cart-container'>
            <NavLink to={`/home/${userId}/cartitem`}>
              <FaShoppingCart className='shopping-cart'/>
            </NavLink>
            <div className='quantity-badge'>{data.totalQuantity}</div>
          </div>
          <form>
              <button
                className="logout-btn"
                onClick={logout}
                type="button"
              >
                Logout
              </button>
          </form>
        </div>
      </nav>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}
