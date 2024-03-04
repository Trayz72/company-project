import {useState, useEffect} from "react"
import axios from 'axios'
import {useNavigate} from "react-router-dom"

export function CreateCity() {
  const [values, setValue] = useState({
    City_Name: "",
    State_Id: ""
  })
  
  const [data, setData] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3030/states")
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  function handleChange(event) {
    setValue(prevValue => ({
      ...prevValue,
    [event.target.name]: event.target.value
    }))
  } 

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:3030/createCity', values)
    .then(res => navigate('/dashboard/city'))
    .catch(err => console.log(err))
  }
  // console.log(values);
  
  return (
    <div className="form-container">
      <h2>Create city</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cityName">City name</label>
        <input
         type="text" 
         id="cityName"
         onChange={handleChange}
         name="City_Name"
        />
        <select name="State_Id" onChange={handleChange}>
          {data.map((state, index) => (
            <option key={index} value={state.stateId}>{state.state_name}</option>
          ))}
        </select>
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
