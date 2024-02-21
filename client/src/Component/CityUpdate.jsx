import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const CityUpdate = () => {
  const [values, setValue] = useState({
    City_Name: "",
    State_Id: ""
  })
  const [data, setData] = useState([])
  const {id} = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:3030/states")
      .then(res => setData(res.data))
      .catch(err => console.log(err))

    axios
      .get("http://localhost:3030/getCitiesRecord/" + id)
      .then(res => setValue(prevValue => ({
        ...prevValue,
        City_Name: res.data[0].City_Name,
        State_Id: res.data[0].State_Id
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
    event.preventDefault()
    axios
      .put("http://localhost:3030/updateCity/" + id, values)
      .then(res => navigate('/city'))
      .catch(err => console.log(err))
  }
  return (
    <div className="form-container">
      <h2>update city</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cityName">City name</label>
        <input
         type="text" 
         id="cityName"
         onChange={handleChange}
         name="City_Name"
         value={values.City_Name}
        />
        <select name="State_Id" value={values.State_Id} onChange={handleChange}>
          {data.map((state, index) => (
            <option key={index} value={state.stateId}>{state.state_name}</option>
          ))}
        </select>
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
