import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function WorkerServiceAssignmentList() {
  const [workerServiceAssignments, setWorkerServiceAssignments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3030/worker-service-assignments")
      .then((res) => setWorkerServiceAssignments(res.data))
      .catch((error) => console.log(error));
  }, []);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:3030/worker-service-assignments/${id}`)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  }

  return (
    <div className="table-container">
      <Link to="/dashboard/worker-service-assignments/create" className="link">
        Create
      </Link>
      {workerServiceAssignments.length !== 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Worker ID</th>
              <th>Service ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {workerServiceAssignments.map((assignment) => (
              <tr key={assignment.AssignmentId}>
                <td>{assignment.AssignmentId}</td>
                <td>{assignment.WorkerId}</td>
                <td>{assignment.ServiceRequestId}</td>
                <td className="action-buttons">
                  {/* <Link to={`/dashboard/worker-service-assignments/${assignment.AssignmentId}/update`} className="link">
                    Update
                  </Link> */}
                  <button className="delete-btn" onClick={() => handleDelete(assignment.AssignmentId)}>
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
  );
}
