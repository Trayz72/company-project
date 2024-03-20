import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddService = () => {
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    ServiceCategoryName: "",
    ServiceCategoryDescription: "",
    CostPerHour: 0,
    ProductDimension: 0,
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3030/services",
        formData
      );
      console.log(response.data);

      // Redirect to /services after successful addition
      navigate("/dashboard/services");
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <>

      <div className="form-container">
        <h2>Add Service</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="serviceName">Service Category Name</label>
          <input
            type="text"
            id="serviceName"
            name="ServiceCategoryName"
            value={formData.ServiceCategoryName}
            onChange={handleChange}
            required
          />

          <label htmlFor="serviceDescription">
            Service Category Description
          </label>
          <textarea
            id="serviceDescription"
            name="ServiceCategoryDescription"
            value={formData.ServiceCategoryDescription}
            onChange={handleChange}
            required
          ></textarea>

          <label htmlFor="costPerHour">Cost per Hour</label>
          <input
            type="number"
            id="costPerHour"
            name="CostPerHour"
            value={formData.CostPerHour}
            onChange={handleChange}
            required
          />

          <label htmlFor="productDimension">Product Dimension</label>
          <input
            type="number"
            id="productDimension"
            name="ProductDimension"
            value={formData.ProductDimension}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">
            Add Service
          </button>
        </form>
      </div>
    </>
  );
};

export default AddService;
