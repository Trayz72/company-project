import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export const ColorUpdate = () => {
  const [values, setValue] = useState({
    Color_Name: ""
  })

  const {id} = useParams()

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    axios.put(`http://localhost:3030/updateColorName/${id}`, values)
    .then(res => navigate('/dashboard/Color'))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    // console.log(id)
    axios
    .get(`http://localhost:3030/getColorRecord/${id}` )
    .then(res => setValue({
      ...values,
      Color_Name: res.data[0].Color_Name
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
      <h2>Update Color Name</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="colorName">Color name</label>
        <input
         type="text" 
         id="colorName"
         onChange={handleChange}
         name="Color_Name"
         value={values.Color_Name}
        />
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
