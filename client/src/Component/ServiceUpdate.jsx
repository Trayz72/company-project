import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

export const ServiceUpdate = () => {
  const [values, setValues] = useState({
    ServiceName: "",
    ServiceDescription: "",
    CostPerHour: "",
    ProductDimension: "",
    Image: "",
  })

  const {id} = useParams();
  const navigate = useNavigate();


  useEffect(()=>{
    axios
      .get("http://localhost:3030/getServiceById/" + id)
      .then(res => setValues(prevValue => ({
        ...prevValue,
        ServiceName: res.data[0].ServiceName,
        ServiceDescription: res.data[0].ServiceDescription,
        CostPerHour: res.data[0].CostPerHour,
        ProductDimension: res.data[0].ProductDimension,
        Image: res.data[0].Image,
      })))
      .catch(err => console.log(err))
  },[])

  function handleChange(event) {
    if (event.target.type === 'file') {
      setValues(prevValue => ({
        ...prevValue,
        [event.target.name]: event.target.files[0]
      }));
    } else {
      setValues(prevValue => ({
        ...prevValue,
        [event.target.name]: event.target.value
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData();
    formData.append('ServiceName', values.ServiceName)
    formData.append('ServiceDescription', values.ServiceDescription)
    formData.append('CostPerHour', values.CostPerHour)
    formData.append('ProductDimension', values.ProductDimension)
    if (values.Image) {
      formData.append('Image', values.Image);
    }
    axios.put(`http://localhost:3030/updateService/${id}`, formData)
    .then(res => navigate('/dashboard/service'))
    .catch(err => console.log(err))
  }
  return (
    <div className="form-container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="ServiceName">Service Name</label>
        <input 
          type="text"
          id="ServiceName"
          onChange={handleChange} 
          name="ServiceName"
          value={values.ServiceName}
          required
        />
        <label htmlFor="ServiceDescription">Service Description</label>
        <input
          type="text" 
          id="ServiceDescription"
          onChange={handleChange}
          name="ServiceDescription"
          value={values.ServiceDescription}
          required
        />
        <label htmlFor="CostPerHour">cost per hour</label>
        <input
          type="number" 
          id="CostPerHour"
          onChange={handleChange}
          name="CostPerHour"
          value={values.CostPerHour}
          required
        />
        <label htmlFor="ProductDimension">Product dimension</label>
        <input
          type="number" 
          id="ProductDimension"
          onChange={handleChange}
          name="ProductDimension"
          value={values.ProductDimension}
          required
        />
        <label htmlFor="Image">Image</label>
        <input
          type="file" 
          id="Image"
          onChange={handleChange}
          name="Image"
          accept="image/*"
        />
        {values.Image && (
          <img
            src={`http://localhost:3030/images/${values.Image}`}
            alt="Current Product Image"
            style={{ maxWidth: '200px', maxHeight: '200px' }}
          />
        )}
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
