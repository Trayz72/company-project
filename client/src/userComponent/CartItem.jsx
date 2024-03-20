import {useState, useEffect, useContext} from 'react';
import { logContext } from "./Context";
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import '../styles/CartItem.css';

export const CartItem = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const { userId } = useContext(logContext);

  useEffect(()=> {
    axios
      .get("http://localhost:3030/getAllCartItem")
      .then(res => setData(res.data))
      .catch(error => console.log(error))
  }, [])

  useEffect(()=> {
    axios
      .get("http://localhost:3030/getSumOfProductPrice")
      .then(res => setTotal(res.data[0]))
      .catch(error => console.log(error))
  }, [])
  
  function handleDelete(id) {
    axios
      .delete("http://localhost:3030/deleteCartItem/" + id)
      .then(res => window.location.reload())
      .catch(err => console.log(err))
  }
  
  return (
    <div className="table-container">
      <h3>Cart Item</h3>
      {data.length !== 0 ? (
      <table className="custom-table">
        <thead className="white-heading">
          <tr>
            <th>Products</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Handle</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <td>
                <img 
                  src={`http://localhost:3030/images/${item.Image}`} alt="" 
                  style={{width:"100px", height:"100px"}}
                />
              </td>
              <td>{item.ProductName}</td>
              <td>{item.ProductPrice}</td>
              <td>{item.quantity}</td>
              <td>{item.totalPrice}</td>
              <td className="action-buttons">
                <button className="delete-button" onClick={() => handleDelete(item.cartItemId)}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : (
        <h2>No records available</h2>
      )}
      <div className='cart-summary'>
        <NavLink to={`/home/${userId}`} className="continue-shoping">Continue   Shopping</NavLink>
        <div className='cart-total-container'>
          <h3>Cart Total</h3>
          <div className="cart-item">
            <div className='total'>Subtotal</div>
            <div>{total.totalPrice}</div>
          </div>
          <div className="cart-item">
            <div className='total'>total</div>
            <div>{total.totalPrice}</div>
          </div>
          <button className='checkout-button'>Proceed To Checkout</button>
        </div>
      </div>
      
  </div>
  )
}
