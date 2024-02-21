import { useState } from "react"
import axios from 'axios'
import {useNavigate} from "react-router-dom"

export const CreateAdmin = () => {
  
  const [values, setValue] = useState({
    User_Name: "",
    Password: ""
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
    axios.post('http://localhost:3030/create', values)
    .then(res => navigate('/'))
    .catch(err => console.error("Error creating state:", err))
  }

  // console.log(value.User_Name, value.Password)
  
  return (
    <div className="form-container">
      <h2>Create admin</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="adminName">Admin name</label>
        <input
         type="text" 
         id="adminName"
         onChange={handleChange}
         name="User_Name"
        />
        <label htmlFor="password">Password</label>
        <input
         type="password"
         id="password"
         name="Password"
         onChange={handleChange}
        />
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
