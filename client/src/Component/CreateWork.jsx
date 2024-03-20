import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CreateWork() {
  const [WorkName, setWorkName] = useState({
    WorkName: ""
  });
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setWorkName((prevWork) => ({
      ...prevWork,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3030/works", WorkName)
      .then(() => navigate("/dashboard/work"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="form-container">
      <h2>Create Work</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="workName">Work Name</label>
        <input
          type="text"
          id="workName"
          name="WorkName"
          value={WorkName.WorkName}
          onChange={handleChange}
        />
        <button className="submit-btn">Submit</button>
      </form>
    </div>
  );
}
