import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export const ProductWeightUpdate = () => {
  const [values, setValue] = useState({
    Product_Weight: ""
  })

  const {id} = useParams()

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    axios.put(`http://localhost:3030/updateProductWeight/${id}`, values)
    .then(res => navigate('/ProductWeight'))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    console.log(id)
    axios
    .get(`http://localhost:3030/getProductWeightRecord/${id}` )
    .then(res => setValue({
      ...values,
      Product_Weight: res.data[0].Product_Weight
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
      <h2>Update Product Weight</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productTypeName">product weight</label>
        <input
         type="text" 
         id="productWeight"
         onChange={handleChange}
         name="Product_Weight"
         value={values.Product_Weight}
        />
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
