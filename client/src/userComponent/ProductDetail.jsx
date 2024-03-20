import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import "../styles/ProductDetail.css"

export const ProductDetail = () => {
  const [values, setValues] = useState({})
  const [data, setData] = useState({
    ProductId: "",
    quantity: 1,
    totalPrice: ""
  });

  const {id} = useParams();
  
  useEffect(()=>{
    axios
      .get("http://localhost:3030/getProductDetailById/" + id)
      .then(res => {
        setValues(prevValue => ({
          ...prevValue,
          ProductId: res.data[0].ProductId,
          ProductName: res.data[0].ProductName,
          ProductDescription: res.data[0].ProductDescription,
          Product_Type_Name: res.data[0].Product_Type_Name,
          Product_Weight: res.data[0].Product_Weight,
          Color_Name: res.data[0].Color_Name,
          ProductPrice: res.data[0].ProductPrice,
          Image: res.data[0].Image,
        }));
        // Set totalPrice initially to productPrice with quantity 1
        setData(prevData => ({
          ...prevData,
          totalPrice: res.data[0].ProductPrice,
          ProductId: res.data[0].ProductId
        }));
      })
      .catch(err => console.log(err))
  }, [id])

  function handleAddQuantity(event) {
    event.preventDefault()
    const newQuantity = parseInt(data.quantity) + 1;
    const totalPrice = values.ProductPrice * newQuantity

    setData(prevData => ({
      ...prevData,
      quantity:newQuantity,
      totalPrice: totalPrice
    }))
    console.log(data)
  }

  function handleSubQuantity(event) {
    event.preventDefault()

    const newQuantity = parseInt(data.quantity) - 1;
    const updatedQuantity = newQuantity < 1 ? 1 : newQuantity
    const totalPrice = values.ProductPrice * updatedQuantity
    
    setData(prevData => ({
      ...prevData,
      quantity: updatedQuantity,
      totalPrice: totalPrice
    }))
    console.log(data)
  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post("http://localhost:3030/createCartItem", data)
    .then(res => alert("Item added in cart successfully"))
    .catch(err => console.log(err))
    console.log(data)
  }

  
  return (
    <div className='product-container'>
      <div className='product-image'>
        <img
          src={`http://localhost:3030/images/${values.Image}`}
          alt={values.ProductName}
        />
      </div>
      <div className='product-details'>
        <h3 className='product-name'>{values.ProductName}</h3>
        <p className='product-description'>{values.ProductDescription}</p>
        <p className='product-info'>Product-Type: {values.Product_Type_Name}</p>
        <p className='product-info'>Weight: {values.Product_Weight}</p>
        <p className='product-info'>Color: {values.Color_Name}</p>
        <p className='product-price'>Price: {values.ProductPrice}</p>
        <form onSubmit={handleSubmit} className="quantity-form">
          <button className='quantity-btn' onClick={handleSubQuantity}>-</button>
          <input type="text" className='quantity-input' value={data.quantity} readOnly/>
          <button className='quantity-btn' onClick={handleAddQuantity}>+</button>
          <button>Add To Cart</button>
        </form>
      </div>
    </div>
  )
}
