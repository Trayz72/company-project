import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import "../styles/ProductStyle.css"

export const ServiceList = ({userId}) => {
  const [data, setData] = useState([]);

  useEffect(()=> {
    axios
      .get("http://localhost:3030/getAllServices")
      .then(res => setData(res.data))
      .catch(error => console.log(error))
  }, [])


  return (
    <div className='container'>
    <h2>Our Services</h2>
    <div className='container-list'>
      {data.map((item, index) => 
        <div key={index} className="product-listcontainer">
          <img 
            src={`http://localhost:3030/images/${item.Image}`} alt="" 
            style={{width:"200px", height:"150px"}}
            className="product-image"
          />
          <h4 className="product-name" >{item.ServiceName}</h4>
          <Link to={`/home/${userId}/serviceDetail/${item.ServiceId}`} className="view-product-link">View services</Link>
        </div>
      )}
    </div>
  </div>
  )
}
