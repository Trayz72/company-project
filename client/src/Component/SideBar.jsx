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
                <Link to='/dashboard/admin' >adminList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/dashboard/state' >stateList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/dashboard/city' >cityList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/dashboard/area' >areaList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/dashboard/productType' >productTypeList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/dashboard/productCategory' >productCategoryList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/dashboard/productWeight' >productWeightList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/dashboard/color' >colorList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/dashboard/products' >productsList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/dashboard/work' >WorkList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/dashboard/worker' >WorkerList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/dashboard/services' >Service</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/dashboard/serviceReqs' >ServiceRequestList</Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to='/dashboard/worker-service-assignments' >Assigned Worker</Link>
              </li>
            </ul>
            }
          </div>
      </div>
    </aside>
  )
}

 