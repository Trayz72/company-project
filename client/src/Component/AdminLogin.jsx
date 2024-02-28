import { useState } from "react"
import axios from 'axios'
import {useNavigate} from "react-router-dom"


export const AdminLogin = () => {
 
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

  const [error, setError] = useState()

  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  
  function handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:3030/adminLogin', values)
    .then(res => {
      if (res.data.loginStatus) {
        navigate('/admin')  
      } else {
        setError(res.data.Error)
      }
    })
    .catch(err => console.error("Error creating state:", err))
  }

  // console.log(value.User_Name, value.Password)
  
  return (
    <div className="form-container">
      <div>{error && error}</div>
      <h2>Admin Login</h2>
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
        <button className="submit-btn">Log In</button>
      </form>
    </div>
  )
}
