import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import "../styles/ProductDetail.css"

export const ServiceDetail = () => {
  const [values, setValues] = useState({})
  const [data, setData] = useState({
    ServiceId: "",
    Dimension: "",
    totalPrice: ""
  });

  const {id} = useParams();
  useEffect(()=>{
    axios
      .get("http://localhost:3030/getServiceById/" + id)
      .then(res => {
        setValues(prevValue => ({
          ...prevValue,
          ServiceName: res.data[0].ServiceName,
          ServiceDescription: res.data[0].ServiceDescription,
          CostPerHour: res.data[0].CostPerHour,
          ProductDimension: res.data[0].ProductDimension,
          Image: res.data[0].Image,
        }));

        setData(prevData => ({
          ...prevData,
          ServiceId: res.data[0].ServiceId
        }));
      })
      .catch(err => console.log(err))
  }, [id])

  function handleDimension(event) {
    event.preventDefault()
    const newDimension = parseInt(event.target.value); 
    const totalCost = newDimension * values.CostPerHour; 
    setData(prevData => ({
      ...prevData,
      Dimension: newDimension,
      totalPrice: totalCost
    }));
  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post("http://localhost:3030/createServiceCart", data)
    .then(res => alert("Service Item added in cart successfully"))
    .catch(err => console.log(err))
    console.log(data)
  }
  return (
    <div className='product-parent'>
      <div className='product-container'>
        <div className='product-image'>
          <img
            src={`http://localhost:3030/images/${values.Image}`}
            alt={values.ServiceName}
          />
        </div>
        <div className='product-details'>
          <h3 className='product-name'>{values.ServiceName}</h3>
          <p className='product-description'>{values.ServiceDescription}</p>
          <p className='product-info'>Cost Per Hour: {values.CostPerHour}</p>
          <form onSubmit={handleSubmit} className="quantity-form">
            <div className='quantity-container'>
              <input type="number" className='quantity-input' value={data.Dimension} onChange={handleDimension}/>
            </div>
            <div className='add-cart-container'>
              <button className='add-to-cart'>Add To Cart</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
