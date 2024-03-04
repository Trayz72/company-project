import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export const ProductTypeUpdate = () => {
  const [values, setValue] = useState({
    Product_Type_Name: ""
  })

  const {id} = useParams()

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    axios.put(`http://localhost:3030/updateProductType/${id}`, values)
    .then(res => navigate('/dashboard/ProductType'))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    console.log(id)
    axios
    .get(`http://localhost:3030/getProductTypeRecord/${id}` )
    .then(res => setValue({
      ...values,
      Product_Type_Name: res.data[0].Product_Type_Name
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
      <h2>Update ProductType Name</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productTypeName">productType name</label>
        <input
         type="text" 
         id="productTypeName"
         onChange={handleChange}
         name="Product_Type_Name"
         value={values.Product_Type_Name}
        />
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
