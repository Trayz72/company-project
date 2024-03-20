// WorkerAssignedPage.jsx

import React, { useState } from "react";
import axios from "axios";

export const WorkerAssignedPage = () => {
    const [workerId, setWorkerId] = useState("");
    const [assignedWork, setAssignedWork] = useState([]); // Initialize as an empty array
  
    const handleWorkerIdChange = (e) => {
      setWorkerId(e.target.value);
    };
  
    const handleGetAssignedWork = () => {
        axios
          .get(`http://localhost:3030/worker-service-assignments/${workerId}`)
          .then((res) => {
            console.log(res.data); // Check the structure of res.data
            if (Array.isArray(res.data)) {
              setAssignedWork(res.data); // directly set assignedWork to res.data
            } else if (typeof res.data === 'object' && Object.keys(res.data).length > 0) {
              // Wrap the single object in an array
              setAssignedWork([res.data]);
            } else {
              console.error("Assignments data is not valid");
            }
          })
          .catch((error) => console.error(error));
      };
    
      
      
  
    return (
      <div>
        <h2>Assigned Work for Worker</h2>
        <label>
          Worker ID:
          <input
            type="text"
            value={workerId}
            onChange={handleWorkerIdChange}
          />
        </label>
        <button onClick={handleGetAssignedWork}>Get Assigned Work</button>
        <div>
          <h3>Assigned Work:</h3>
          <ul>
          {assignedWork.map((assignment) => (
  <li key={assignment.AssignmentId}>
    AssignmentId: {assignment.RequestId} - ServiceRequestId: {assignment.ServiceRequestId} Assigned Date: {assignment.AssignedDate}
  </li>
))}

          </ul>
        </div>
      </div>
    );
  };
  