import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ProductCategory = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3030/getAllProductCategory")
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  function handleDelete(id) {
    axios
      .delete("http://localhost:3030/deleteProductCategory/" + id)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  }

  return (
    <div className="table-container">
        <Link to="/CreateProductCategory" className="link">
          Create
        </Link>
      {data.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Product category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <td>{item.Product_Category_Id}</td>
                  <td>{item.Product_Category_Name}</td>
                  <td className="action-buttons">
                    <Link className="link" to={`/ProductCategoryUpdate/${item.Product_Category_Id}`}>update</Link>
                    <button className="delete-btn" onClick={() => handleDelete(item.Product_Category_Id)}>
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
