import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

export const Service = () => {
  const [data, setData] = useState([]);

  useEffect(()=> {
    axios
      .get("http://localhost:3030/getAllServices")
      .then(res => setData(res.data))
      .catch(error => console.log(error))
  }, [])

  function handleDelete(id) {
    axios
      .delete("http://localhost:3030/deleteService/" + id)
      .then(res => window.location.reload())
      .catch(err => console.log(err))
  }
  
  return (
    <div className="table-container">
    <Link to="/dashboard/createService" className="link">
      Create
    </Link>
    {data.length !== 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>ServiceName</th>
              <th>ServiceDescription</th>
              <th>CostPerHour</th>
              <th>ProductDimension</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{item.ServiceId}</td>
                <td>{item.ServiceName}</td>
                <td>{item.ServiceDescription}</td>
                <td>{item.CostPerHour}</td>
                <td>{item.ProductDimension}</td>
                <td>
                  <img 
                    src={`http://localhost:3030/images/${item.Image}`} alt="" 
                    style={{width:"100px", height:"100px"}}
                  />
                </td>
                <td className="action-buttons">
                  <Link className="link" to={`/dashboard/serviceupdate/${item.ServiceId}`}>update</Link>
                  <button className="delete-btn" onClick={() => handleDelete(item.ServiceId)}>
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
