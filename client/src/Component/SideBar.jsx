import { useState } from 'react'
import {Link} from 'react-router-dom'
import '../styles/SideBar.css'
import { ImCross } from "react-icons/im";

export function SideBar({ isActive, toggleSidebar }) {

  const [isCheck, setIsCheck] = useState(false)
  return (
    <aside className={`sidebar ${isActive ? 'active' : ''}`}>
      <div className='title'>
        <h3>Dashboard</h3>
        <ImCross className='cross' onClick={toggleSidebar}/>
      </div>
      <div className="accordion">
          <div className='accordian-item'>
            <div 
              className="accordian-title"
              onClick={() => setIsCheck(!isCheck)}
            >
              <h4>Master</h4>
              <div className='accordian-icon'>{isCheck ? '-' : '+'}</div>
            </div>
            {isCheck && 
              <ul className='sidebar-list'>
              <li className='sidebar-list-item'>
                <Link to='/' >adminList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/state' >stateList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/city' >cityList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/area' >areaList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/productType' >productTypeList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/productCategory' >productCategoryList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/productWeight' >productWeightList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/color' >colorList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/products' >productsist</Link>
              </li>
            </ul>
            }
          </div>
      </div>
    </aside>
  )
}

 