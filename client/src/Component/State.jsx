import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function State() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3030/states")
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  function handleDelete(id) {
    axios
      .delete("http://localhost:3030/deleteState/" + id)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  }

  return (
    <div className="table-container">
        <Link to="/dashboard/CreateState" className="link">
          Create
        </Link>
      {data.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>StateName</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <td>{item.stateId}</td>
                  <td>{item.state_name}</td>
                  <td className="action-buttons">
                    <Link className="link" to={`/dashboard/updateState/${item.stateId}`}>update</Link>
                    <button className="delete-btn" onClick={() => handleDelete(item.stateId)}>
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

