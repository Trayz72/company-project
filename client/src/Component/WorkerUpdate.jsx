import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export function WorkerUpdate() {
  const [workerData, setWorkerData] = useState({
    WorkerName: "",
    Address: "",
    Email: "",
    Password: "",
    Contact: "",
    WorkID: "" // Initialize to an empty string
  });
  const [works, setWorks] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3030/workers/${id}`)
      .then((response) => {
        setWorkerData(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
         
        } else {
          
          console.error("Error fetching worker data:", error);
        }
      });
  
    // Fetch list of works
    axios
      .get("http://localhost:3030/works")
      .then((response) => {
        setWorks(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWorkerData((prevWorkerData) => ({
      ...prevWorkerData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3030/workers/${id}`, workerData)
      .then(() => navigate("/dashboard/worker"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="form-container">
      <h2>Update Worker</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="WorkerName">Worker Name</label>
        <input
          type="text"
          id="WorkerName"
          name="WorkerName"
          value={workerData.WorkerName}
          onChange={handleChange}
        />
        <label htmlFor="Address">Address</label>
        <input
          type="text"
          id="Address"
          name="Address"
          value={workerData.Address}
          onChange={handleChange}
        />
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          id="Email"
          name="Email"
          value={workerData.Email}
          onChange={handleChange}
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="Password"
          name="Password"
          value={workerData.Password}
          onChange={handleChange}
        />
        <label htmlFor="Contact">Contact</label>
        <input
          type="text"
          id="Contact"
          name="Contact"
          value={workerData.Contact}
          onChange={handleChange}
        />
        <label htmlFor="WorkID">Work Name</label>
        <select
          id="WorkID"
          name="WorkID"
          value={workerData.WorkID || ""} 
          onChange={handleChange}
        >
          <option value="">Select Work Name</option>
          {works.map((work) => (
            <option key={work.WorkID} value={work.WorkID}>
              {work.WorkName}
            </option>
          ))}
        </select>
        <button type="submit" className="submit-btn">
          Update
        </button>
      </form>
    </div>
  );
}
