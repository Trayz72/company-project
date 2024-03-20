import { useState } from "react"
import axios from 'axios'
import {useNavigate, Link} from "react-router-dom"


export const UserLogin = () => {
 
  const [values, setValue] = useState({
    Username: "",
    Password: ""
  })
  const [userId, setUserId] = useState(null);

  function handleChange(event) {
    setValue(prevValue => ({
      ...prevValue,
    [event.target.name]: event.target.value
    }))
  } 

  const [error, setError] = useState()

  const navigate = useNavigate()
  
  function handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:3030/userLogin', values)
    .then(res => {
      if (res.data.userType) {
        navigate(`/home/${res.data.UserId}`)  
      } else {
        setError(res.data.Error)
      }
    })
    .catch(err => console.error("Error creating state:", err))
  }

  // console.log(value.User_Name, value.Password)
  
  return (
    <div className="form-container">
      <div style={{color: "red"}}>{error && error}</div>
      <h2>user Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">user name</label>
        <input
         type="text" 
         id="userName"
         onChange={handleChange}
         name="Username"
        />
        <label htmlFor="password">Password</label>
        <input
         type="password"
         id="password"
         name="Password"
         onChange={handleChange}
        />
        <button className="submit-btn">Log In</button>
        <div style={{marginTop: '10px'}}>
          <p>
            Do not have an account? 
            <Link to='/userRegistration'>Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  )
}
