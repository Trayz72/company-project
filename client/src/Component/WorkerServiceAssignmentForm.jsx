import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function WorkerServiceAssignmentForm() {
  const [workers, setWorkers] = useState([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState("");
  const [serviceRequests, setServiceRequests] = useState([]);
  const [selectedServiceRequestId, setSelectedServiceRequestId] = useState("");
  const [assignedDate, setAssignedDate] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    // Fetch list of workers
    axios
      .get("http://localhost:3030/workers")
      .then((res) => setWorkers(res.data))
      .catch((error) => console.error(error));

    // Fetch list of service requests
    axios
      .get("http://localhost:3030/serviceRequests")
      .then((res) => setServiceRequests(res.data))
      .catch((error) => console.error(error));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3030/worker-service-assignments", {
        ServiceRequestId: selectedServiceRequestId,
        WorkerId: selectedWorkerId,
        AssignedDate: assignedDate
      })
      .then(() => nav("/dashboard/worker-service-assignments"))
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <h2>Create Worker Service Assignment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Worker:
          <select value={selectedWorkerId} onChange={(e) => setSelectedWorkerId(e.target.value)}>
            <option value="">Select Worker</option>
            {workers.map((worker) => (
              <option key={worker.WorkerID} value={worker.WorkerID}>
                {worker.WorkerName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Service Request ID:
          <select value={selectedServiceRequestId} onChange={(e) => setSelectedServiceRequestId(e.target.value)}>
            <option value="">Select Service Request ID</option>
            {serviceRequests.map((request) => (
              <option key={request.RequestId} value={request.RequestId}>
                {request.RequestId}
              </option>
            ))}
          </select>
        </label>
        <label>
          Assigned Date:
          <input type="date" value={assignedDate} onChange={(e) => setAssignedDate(e.target.value)} />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
