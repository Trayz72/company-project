import { useState, useEffect } from "react"
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom"

export const UpdateState = () => {
  const [values, setValue] = useState({
    state_name: ""
  })

  const {id} = useParams()

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    axios.put(`http://localhost:3030/updateState/${id}`, values)
    .then(res => navigate('/state'))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    console.log(id)
    axios
    .get(`http://localhost:3030/getStateRecord/${id}` )
    .then(res => setValue({
      ...values,
      state_name: res.data[0].state_name
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
      <h2>Update state</h2>
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
