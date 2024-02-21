import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const AreaUpdate = () => {
  const [values, setValue] = useState({
    Pincode: "",
    Area_Name: "",
    City_Id: "",
  })
  const [data, setData] = useState([])
  const {id} = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:3030/getCities")
      .then(res => setData(res.data))
      .catch(err => console.log(err))

      axios
      .get("http://localhost:3030/getAreasRecord/" + id)
      .then(res => setValue(prevValue => ({
        ...prevValue,
        Pincode: res.data[0].Pincode,
        Area_Name: res.data[0].Area_Name,
        City_Id: res.data[0].City_Id,
      })))
      .catch(err => console.log(err))
  }, [id])

  function handleChange(event) {
    setValue(prevValue => ({
      ...prevValue,
      [event.target.name]: event.target.value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put("http://localhost:3030/updateArea/" + id, values)
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
          value={values.Pincode}
          maxLength={6}
          required
        />
        <label htmlFor="areaName">Area Name</label>
        <input
          type="text" 
          id="areaName"
          onChange={handleChange}
          name="Area_Name"
          value={values.Area_Name}
          required
        />
        <select name="City_Id" value={values.City_Id} onChange={handleChange}>
          {data.map((city, index) => (
            <option key={index} value={city.City_Id}>{city.City_Name}</option>
          ))}
        </select>
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
