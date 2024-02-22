import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const CreateProductWeight = () => {
  const [values, setValue] = useState({
    Product_Weight: ""
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
    axios.post('http://localhost:3030/createProductWeight', values)
    .then(res =>navigate('/ProductWeight'))
    .catch(err => console.log(err))
  }
  
  return (
    <div className="form-container">
      <h2>Create product weight</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productweight">product weight</label>
        <input
         type="text" 
         id="productweight"
         onChange={handleChange}
         name="Product_Weight"
        />
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
