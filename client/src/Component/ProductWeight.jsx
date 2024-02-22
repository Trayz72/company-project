import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ProductWeight = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3030/getAllProductWeight")
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  function handleDelete(id) {
    axios
      .delete("http://localhost:3030/deleteProductWeight/" + id)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  }

  return (
    <div className="table-container">
        <Link to="/CreateProductWeight" className="link">
          Create
        </Link>
      {data.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Product Weight</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <td>{item.Product_Weight_Id}</td>
                  <td>{item.Product_Weight}</td>
                  <td className="action-buttons">
                    <Link className="link" to={`/ProductWeightUpdate/${item.Product_Weight_Id}`}>update</Link>
                    <button className="delete-btn" onClick={() => handleDelete(item.Product_Weight_Id)}>
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
