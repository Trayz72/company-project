import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const CreateProductType = () => {
  const [values, setValue] = useState({
    Product_Type_Name: ""
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
    axios.post('http://localhost:3030/createProductType', values)
    .then(res => navigate('/dashboard/ProductType'))
    .catch(err => console.log(err))
  }
  
  return (
    <div className="form-container">
      <h2>Create product type</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productTypeName">product type name</label>
        <input
         type="text" 
         id="productTypeName"
         onChange={handleChange}
         name="Product_Type_Name"
        />
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
