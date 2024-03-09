import { useState, useEffect } from "react"
import axios from 'axios'
import {useNavigate} from "react-router-dom"

const UserRegistration = () => {
  const [values, setValue] = useState({
    Username: "",
    Address: "",
    Contact_Number: "",
    Email: "",
    Password: "",
    Pincode: ""
  })

  const [data, setData] = useState([]);
  

  useEffect(()=> {
    axios
      .get("http://localhost:3030/getAllAreas")
      .then(res => setData(res.data))
      .catch(error => console.log(error))
  }, [])
  function handleChange(event) {
    setValue(prevValue => ({
      ...prevValue,
    [event.target.name]: event.target.value
    }))
  } 

  // const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  
  function handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:3030/userRegister', values)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.error("Error creating state:", err))
  }

  return (
    <div className="form-container">
      <h2>Usert Registration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">User name</label>
        <input
          type="text" 
          id="userName"
          onChange={handleChange}
          name="Username"
          required
        />
        <label htmlFor="address">Address</label>
        <textarea
          type="text" 
          id="address"
          onChange={handleChange}
          name="Address"
          required
        >
        </textarea>
        <label htmlFor="contact">contact</label>
        <input
          type="number" 
          id="contact"
          onChange={handleChange}
          name="Contact_Number"
          maxLength = {10}
          required
        />
        <label htmlFor="email">Email address</label>
        <input
          type="email" 
          id="email"
          onChange={handleChange}
          name="Email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="Password"
          onChange={handleChange}
          required
        />
        <label htmlFor="pincode">Pincode</label>
        <select name="Pincode" id="pincode" onChange={handleChange} required>
          {data.map((pincode, index) => (
            <option key={index} value={pincode.Pincode}>{pincode.Pincode}</option>
          ))}
        </select>
        <button className="submit-btn">Create Account</button>
      </form>
    </div>
  )
}

export default UserRegistration