import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const UpdateService = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    ServiceCategoryName: "",
    ServiceCategoryDescription: "",
    CostPerHour: "",
    ProductDimension: "",
  });

  // ID parameter from the URL
  const { id } = useParams();


  // Navigate hook for redirection
  const navigate = useNavigate();

  // Effect to fetch service details when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:3030/services/${id}`)
      .then((res) => {
        setFormData(res.data[0]);
      })
      .catch((error) =>
        console.error("Error fetching service details:", error)
      );
  }, [id]);

  // Function to handle form input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Function to handle form submission for updating service
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3030/services/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        // Redirect to the list of services after successful update
        navigate("/dashboard/services");
      })
      .catch((error) => console.error("Error updating service:", error));
  };

  return (
    <>
      <div className="form-container">
        <h2>Update Service</h2>
        <form onSubmit={handleSubmit}>
          {/* Add your form input fields based on the service properties */}
          <label htmlFor="serviceCategoryName">Service Category Name</label>
          <input
            type="text"
            id="serviceCategoryName"
            name="ServiceCategoryName"
            value={formData.ServiceCategoryName}
            onChange={handleChange}
            required
          />

          <label htmlFor="serviceCategoryDescription">
            Service Category Description
          </label>
          <textarea
            id="serviceCategoryDescription"
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
            type="text"
            id="productDimension"
            name="ProductDimension"
            value={formData.ProductDimension}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">
            Update Service
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateService;
