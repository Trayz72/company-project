import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export const ProductCategoryUpdate = () => {
  const [values, setValue] = useState({
    Product_Category_Name: ""
  })

  const {id} = useParams()

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    axios.put(`http://localhost:3030/updateProductCategory/${id}`, values)
    .then(res => navigate('/ProductCategory'))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    // console.log(id)
    axios
    .get(`http://localhost:3030/getProductCategoryRecord/${id}` )
    .then(res => setValue({
      ...values,
      Product_Category_Name: res.data[0].Product_Category_Name
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
      <h2>Update ProductCategory Name</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productCategoryName">productCategory name</label>
        <input
         type="text" 
         id="productCategoryName"
         onChange={handleChange}
         name="Product_Category_Name"
         value={values.Product_Category_Name}
        />
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
