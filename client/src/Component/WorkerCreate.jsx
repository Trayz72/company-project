import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function WorkerCreate() {
  const [workerData, setWorkerData] = useState({
    WorkerName: "",
    Address: "",
    Email: "",
    Password: "",
    Contact: "",
    WorkID: ""
  });
  const [works, setWorks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3030/works")
      .then((response) => {
        setWorks(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWorkerData((prevWorkerData) => ({
      ...prevWorkerData,
      [name]: value
    }));
  };

  // const handleWorkChange = (event) => {
  //   const selectedWork = works.find((work) => work.WorkName === event.target.value);
  //   setWorkerData((prevWorkerData) => ({
  //     ...prevWorkerData,
  //     WorkID: selectedWork ? selectedWork.WorkID : ""
  //   }));
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3030/workers", workerData)
      .then(() => navigate("/dashboard/worker"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="form-container">
      <h2>Create Worker</h2>
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
          value={workerData.WorkID}
          onChange={handleChange}
        >
          <option value="">Select Work Name</option>
          {works.map((work) => (
            <option key={work.WorkID} value={work.WorkID}>
              {work.WorkName}
            </option>
          ))}
        </select>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}


