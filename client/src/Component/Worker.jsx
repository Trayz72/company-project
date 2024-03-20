// Worker.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function Worker() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3030/workers")
      .then((res) => setWorkers(res.data))
      .catch((error) => console.log(error));
  }, []);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:3030/workers/${id}`)
      .then(() => {
        setWorkers(workers.filter((worker) => worker.WorkerID !== id));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="table-container">
      <Link to="/dashboard/createWorker" className="link">Create </Link>
      {workers.length !== 0 ? ( <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Work</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.WorkerID}>
              <td>{worker.WorkerID}</td>
              <td>{worker.WorkerName}</td>
              <td>{worker.Email}</td>
              <td>{worker.Contact}</td>
              <td>{worker.WorkName}</td>
              <td className="action-buttons">
                <Link to={`/dashboard/updateWorker/${worker.WorkerID}` } className="link">Edit</Link>
                <button onClick={() => handleDelete(worker.WorkerID)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> ) : (
          <h2>No records available</h2>
        )}
    </div>
  );
}


