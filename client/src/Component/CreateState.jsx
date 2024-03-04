import { useState } from "react"
import axios from 'axios'
import {useNavigate} from "react-router-dom"

export const CreateState = () => {
  const [values, setValue] = useState({
    state_name: ""
  })

  function handleChange(event) {
    setValue(prevValue => ({
      ...prevValue,
    [event.target.name]: event.target.value
    }))
  } 

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:3030/createState', values)
    .then(res => navigate('/dashboard/state'))
    .catch(err => console.log(err))
  }
  
  return (
    <div className="form-container">
      <h2>Create state</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="stateName">State name</label>
        <input
         type="text" 
         id="stateName"
         onChange={handleChange}
         name="state_name"
        />
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
