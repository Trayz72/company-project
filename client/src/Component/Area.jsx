import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

export const Area = () => {
  const [data, setData] = useState([]);
  

  useEffect(()=> {
    axios
      .get("http://localhost:3030/getAllAreas")
      .then(res => setData(res.data))
      .catch(error => console.log(error))
  }, [])

  function handleDelete(id) {
    axios
      .delete("http://localhost:3030/deleteArea/" + id)
      .then(res => window.location.reload())
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className="table-container">
        <Link to="/dashboard/CreateArea" className="link">
          Create
        </Link>
      {data.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Pincode</th>
                <th>AreaName</th>
                <th>CityName</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <td>{item.Pincode}</td>
                  <td>{item.Area_Name}</td>
                  <td>{item.City_Name}</td>
                  <td className="action-buttons">
                    <Link className="link" to={`/dashboard/AreaUpdate/${item.Pincode}`}>update</Link>
                    <button className="delete-btn" onClick={() => handleDelete(item.Pincode)}>
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
    </>
  )
}
