import { useState, useEffect } from "react"
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom"

export const UpdateAdmin = () => {
  const [values, setValue] = useState({
    User_Name: "",
    Password: ""
  })

  const {id} = useParams()

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    axios.put(`http://localhost:3030/update/${id}`, values)
    .then(res => navigate('/'))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    console.log(id)
    axios
    .get(`http://localhost:3030/getrecord/${id}` )
    .then(res => setValue({
      ...values,
      User_Name: res.data[0].User_Name,
      Password: res.data[0].Password
    }))
    .catch(err => console.log(err))
  }, [id])
  
  function handleChange(event) {
    setValue(prevValue => ({
      ...prevValue,
    [event.target.name]: event.target.value
    }))
  } 
  
  return (
    <div className="form-container">
      <h2>Update admin</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="adminName">Admin name</label>
        <input
         type="text" 
         id="adminName"
         onChange={handleChange}
         name="User_Name"
         value={values.User_Name}
        />
        <label htmlFor="password">Password</label>
        <input
         type="password"
         id="password"
         name="Password"
         onChange={handleChange}
         value={values.Password}
        />
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
