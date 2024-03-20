import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import "../styles/ProductStyle.css"

export const ProductList = ({userId}) => {

  const [data, setData] = useState([]);

  useEffect(()=> {
    axios
      .get("http://localhost:3030/getAllProduct")
      .then(res => setData(res.data))
      .catch(error => console.log(error))
  }, [])


  return (
    <div>
      {data.map((item, index) => 
        <div key={index} className="product-listcontainer">
          <img 
            src={`http://localhost:3030/images/${item.Image}`} alt="" 
            style={{width:"200px", height:"150px"}}
            className="product-image"
          />
          <h4 className="product-name" >{item.ProductName}</h4>
          <Link to={`/home/${userId}/productDetail/${item.ProductId}`} className="view-product-link">View product</Link>
        </div>
      )}
    </div>
  )
}
