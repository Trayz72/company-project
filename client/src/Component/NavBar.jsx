import { useState } from 'react';
import '../styles/NavBar.css'
import { SideBar } from './SideBar';
import { GiHamburgerMenu } from "react-icons/gi";
import '../styles/SideBar.css'

export const NavBar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="header-container">
      <header className={isActive ? 'active' : ''}>
        <GiHamburgerMenu onClick={toggleSidebar} className='hamburger' />
        <h2>Admin Dashboard</h2>
      </header>
      <SideBar isActive={isActive} toggleSidebar={toggleSidebar} />
    </div>
  );
}
