import { useState } from 'react';
import '../styles/NavBar.css'
import { SideBar } from './SideBar';
import { GiHamburgerMenu } from "react-icons/gi";
import '../styles/SideBar.css'
import { Outlet } from 'react-router-dom';

export const NavBar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="header-container">
      <SideBar isActive={isActive} toggleSidebar={toggleSidebar} />
      <div className='section'>
        <header className={isActive ? 'active' : ''}>
          <GiHamburgerMenu onClick={toggleSidebar} className='hamburger' />
          <h2>Admin Dashboard</h2>
        </header>
        <Outlet/>
      </div>
    </div>
  );
}
