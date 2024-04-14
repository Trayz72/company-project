import {useState} from 'react'
import axios from 'axios';
import '../styles/checkoutPayment.css'

const CheckoutPayment = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    paymentMethod: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    axios.post("http://localhost:3030/createCheckoutPayment", formData)
    .then(res => alert("checkout completed"))
    .catch(err => console.log(err))
    console.log(formData);
  };

  return (
    <div className="payment-form">
    <h2>Checkout</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="half-width">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div className="half-width">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="contactNumber">Contact Number</label>
        <input type="tel" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <div className="half-width">
          <label htmlFor="zipCode">Zip Code</label>
          <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
        </div>
        <div className="half-width">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
        </div>
      </div>
      <div className="form-group">
        <div className="full-width">
          <label htmlFor="country">Country</label>
          <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="paymentMethod">Payment Method</label>
        <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
          <option value="">Select Payment Method</option>
          <option value="debitCard">Debit Card</option>
          {/* Add more payment options here if needed */}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
  );
}

export default CheckoutPayment