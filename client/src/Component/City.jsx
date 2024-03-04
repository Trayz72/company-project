import {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import axios from "axios"


export function City() {
  const [data, setData] = useState([])
  
  useEffect(()=> {
    axios
      .get("http://localhost:3030/getAllCities")
      .then(res => setData(res.data))
      .catch(error => console.log(error))
  }, [])

  function handleDelete(id) {
    axios
      .delete("http://localhost:3030/deleteCity/" + id)
      .then(res => window.location.reload())
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className="table-container">
        <Link to="/dashboard/CreateCity" className="link">
          Create
        </Link>
      {data.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>CityName</th>
                <th>StateName</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <td>{item.City_Id}</td>
                  <td>{item.City_Name}</td>
                  <td>{item.state_name}</td>
                  <td className="action-buttons">
                    <Link className="link" to={`/dashboard/CityUpdate/${item.City_Id}`}>update</Link>
                    <button className="delete-btn" onClick={() => handleDelete(item.City_Id)}>
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