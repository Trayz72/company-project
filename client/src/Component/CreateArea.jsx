import {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateArea = () => {
  const [values, setValues] = useState({
    Pincode: "",
    Area_Name: "",
    City_Id: "",
  })

  const [data, setData] = useState([])
  const navigate = useNavigate()
  useEffect(()=> {
    axios
      .get("http://localhost:3030/getCities")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [])

  function handleChange(event) {
    setValues(prevValue => ({
      ...prevValue,
      [event.target.name]: event.target.value
    }))
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:3030/createArea', values)
    .then(res => navigate('/area'))
    .catch(err => console.log(err))
  }

  return (
    <div className="form-container">
      <h2>Create Area</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pinCode">Pin Code</label>
        <input 
          type="number"
          id="pinCode"
          onChange={handleChange} 
          name="Pincode"
          maxLength={6}
          required
        />
        <label htmlFor="areaName">Area Name</label>
        <input
        type="text" 
        id="areaName"
        onChange={handleChange}
        name="Area_Name"
        required
        />
        <select name="City_Id" onChange={handleChange}>
          {data.map((city, index) => (
            <option key={index} value={city.City_Id}>{city.City_Name}</option>
          ))}
        </select>
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
