import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const CreateProductCategory = () => {
  const [values, setValue] = useState({
    Product_Category_Name: ""
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
    axios.post('http://localhost:3030/createProductCategory', values)
    .then(res =>navigate('/dashboard/ProductCategory'))
    .catch(err => console.log(err))
  }
  
  return (
    <div className="form-container">
      <h2>Create product category</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productCategoryName">product category name</label>
        <input
         type="text" 
         id="productCategoryName"
         onChange={handleChange}
         name="Product_Category_Name"
        />
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
