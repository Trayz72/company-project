import {useState} from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";

export const CreateService = () => {
  const [values, setValues] = useState({
    ServiceName: "",
    ServiceDescription: "",
    CostPerHour: "",
    ProductDimension: "",
    Image: "",
  })

  // const {id} = useParams();
  const navigate = useNavigate()

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
    formData.append('Image', values.Image)
    axios.post('http://localhost:3030/createService', formData)
    .then(res => navigate('/dashboard/service'))
    .catch(err => console.log(err))
  }

  return (
    <div className="form-container">
      <h2>Create Service</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ServiceName">Service Name</label>
        <input 
          type="text"
          id="ServiceName"
          onChange={handleChange} 
          name="ServiceName"
          required
        />
        <label htmlFor="ServiceDescription">Service Description</label>
        <input
          type="text" 
          id="ServiceDescription"
          onChange={handleChange}
          name="ServiceDescription"
          required
        />
        <label htmlFor="CostPerHour">Cost Per Hour</label>
        <input
          type="number" 
          id="CostPerHour"
          onChange={handleChange}
          name="CostPerHour"
          required
        />
        <label htmlFor="ProductDimension">Product Dimention</label>
        <input
          type="number" 
          id="ProductDimension"
          onChange={handleChange}
          name="ProductDimension"
          required
        />
        
        <label htmlFor="Image">Image</label>
        <input
          type="file" 
          id="Image"
          onChange={handleChange}
          name="Image"
          required
        />
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
