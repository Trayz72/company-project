import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

export const Products = () => {
  const [data, setData] = useState([]);

  useEffect(()=> {
    axios
      .get("http://localhost:3030/getAllProduct")
      .then(res => setData(res.data))
      .catch(error => console.log(error))
  }, [])

  function handleDelete(id) {
    axios
      .delete("http://localhost:3030/deleteProduct/" + id)
      .then(res => window.location.reload())
      .catch(err => console.log(err))
  }
  
  return (
    <div className="table-container">
        <Link to="/dashboard/CreateProducts" className="link">
          Create
        </Link>
      {data.length !== 0 ? (
          <table className="table">
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
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
                  <td className="action-buttons">
                    <Link className="link" to={`/dashboard/productUpdate/${item.ProductId}`}>update</Link>
                    <button className="delete-btn" onClick={() => handleDelete(item.ProductId)}>
                      delete
                    </button>
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
