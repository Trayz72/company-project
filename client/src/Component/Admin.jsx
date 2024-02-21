import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Admin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3030")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  function handleDelete(id) {
    axios
      .delete("http://localhost:3030/delete/" + id)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  }

  return (
    <div className="table-container">
        <Link to="/create" className="link">
          Create
        </Link>
      {data.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>AdminName</th>
                <th>password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <td>{item.Admin_Id}</td>
                  <td>{item.User_Name}</td>
                  <td>{item.Password}</td>
                  <td className="action-buttons">
                    <Link className="link" to={`/update/${item.Admin_Id}`}>update</Link>
                    <button className="delete-btn" onClick={() => handleDelete(item.Admin_Id)}>
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
  );
};
