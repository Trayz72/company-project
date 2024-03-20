import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function Work() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3030/works")
      .then((res) => setWorks(res.data))
      .catch((error) => console.log(error));
  }, []);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:3030/works/${id}`)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="table-container">
        <Link to="/dashboard/CreateWork" className="link">
          Create
        </Link>
        {works.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Work Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {works.map((work) => (
                <tr key={work.WorkID}>
                  <td>{work.WorkID}</td>
                  <td>{work.WorkName}</td>
                  <td className="action-buttons">
                    <Link to={`/dashboard/WorkUpdate/${work.WorkID}`} className="link">
                      Update
                    </Link>
                    <button className="delete-btn" onClick={() => handleDelete(work.WorkID)}>
                      Delete
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
  );
}
