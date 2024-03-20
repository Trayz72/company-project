import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export function UpdateWorkerServiceAssignment() {
  const { id } = useParams();
  const [workerServiceAssignment, setWorkerServiceAssignment] = useState({});
  const [workers, setWorkers] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedServiceRequestId, setSelectedServiceRequestId] = useState(""); // Add this
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/worker-service-assignments/${id}`)
      .then((res) => {
        setWorkerServiceAssignment(res.data);
        setSelectedWorkerId(res.data.workerId ? res.data.workerId.toString() : "");
        setSelectedServiceId(res.data.serviceId ? res.data.serviceId.toString() : "");
        setSelectedServiceRequestId(res.data.serviceRequestId ? res.data.serviceRequestId.toString() : "");
      })
      .catch((error) => console.error(error));
  
    axios
      .get("http://localhost:3030/workers")
      .then((res) => setWorkers(res.data))
      .catch((error) => console.error(error));
  
    axios
      .get("http://localhost:3030/serviceRequests")
      .then((res) => setServices(res.data))
      .catch((error) => console.error(error));
  }, [id]);
  
  
  
  

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:3030/worker-service-assignments/${id}`, {
        workerId: selectedWorkerId,
        serviceId: selectedServiceId,
        serviceRequestId: selectedServiceRequestId // Add this
      })
      .then(navigate("/dashboard/worker-service-assignments"))
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <h2>Update Worker Service Assignment</h2>
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
            {services.map((request) => (
              <option key={request.RequestId} value={request.RequestId}>
                {request.RequestId}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
