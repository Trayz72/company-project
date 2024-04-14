import {useState, useEffect} from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios';

export const Productrpt = () => {
  const [data, setData] = useState([]);

  useEffect(()=> {
    axios
      .get("http://localhost:3030/getAllProduct")
      .then(res => setData(res.data))
      .catch(error => console.log(error))
  }, [])
  
  return (
    <div className="table-container">
      {data.length !== 0 ? (
          <table border={1}>
            <thead>
              <tr>
                <th>Id</th>
                <th>ProductName</th>
                <th>ProductDescription</th>
                <th>ProductPrice</th>
                <th>ProductCategoryName</th>
                <th>ProductTypeName</th>
                <th>ProductWeight</th>
                <th>Color</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.ProductId}</td>
                  <td>{item.ProductName}</td>
                  <td>{item.ProductDescription}</td>
                  <td>{item.ProductPrice}</td>
                  <td>{item.Product_Category_Name}</td>
                  <td>{item.Product_Type_Name}</td>
                  <td>{item.Product_Weight}</td>
                  <td>{item.Color_Name}</td>
                  <td>
                    <img 
                      src={`http://localhost:3030/images/${item.Image}`} alt="" 
                      style={{width:"100px", height:"100px"}}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      ) : (
        <h2>No records available</h2>
      )}
    </div>
  )
}
