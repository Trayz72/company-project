import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const CreateColor = () => {
  const [values, setValue] = useState({
    Color_Name: ""
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
    axios.post('http://localhost:3030/createColor', values)
    .then(res =>navigate('/dashboard/color'))
    .catch(err => console.log(err))
  }
  
  return (
    <div className="form-container">
      <h2>Create Color Name</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="color">Color Name</label>
        <input
         type="text" 
         id="color"
         onChange={handleChange}
         name="Color_Name"
        />
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
