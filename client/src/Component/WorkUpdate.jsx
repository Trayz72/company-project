import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const WorkUpdate = () => {
  const { id } = useParams();
  const [work, setWork] = useState({
    WorkName: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/works/${id}`)
      .then((res) => setWork(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setWork((prevWork) => ({
      ...prevWork,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`http://localhost:3030/works/${id}`, work)
      .then(() => navigate("/dashboard/work"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="form-container">
      <h2>Update Work</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="workName">Work Name</label>
        <input
          type="text"
          id="workName"
          name="WorkName"
          value={work.WorkName}
          onChange={handleChange}
        />
        <button className="submit-btn">Submit</button>
      </form>
    </div>
  );
};
