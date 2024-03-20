import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { logContext } from "./Context.jsx";
import { useNavigate } from "react-router-dom";

export default function ServiceRequestForm() {
  const { userId } = useContext(logContext);
  const [formData, setFormData] = useState({
    ServiceCategoryId: "",
    WorkDetail: "",
    RequestDate: "",
    ProductDimension: "0", // Initialize with a default value as a string
  });
  const navigate = useNavigate();

  const [serviceCategories, setServiceCategories] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3030/services")
      .then((res) => setServiceCategories(res.data))
      .catch((error) => console.log(error));
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "ServiceCategoryId") {
      const selectedService = serviceCategories.find(
        (category) => category.ServiceCategoryId === parseInt(value, 10)
      );
      setSelectedService(selectedService);
    }
  };

  const calculateTotalCost = () => {
    if (selectedService && formData.ProductDimension !== "") {
      const totalCost =
        (parseInt(formData.ProductDimension, 10) *
          selectedService.CostPerHour) /
        parseInt(selectedService.ProductDimension, 10);

      const calculatedTotalCost = isNaN(totalCost) ? 0 : totalCost.toFixed(2);

      return calculatedTotalCost;
    }
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSubmit = {
        ...formData,
        UserId: userId,
        TotalCost: calculateTotalCost(),
      };

      await axios.post(
        "http://localhost:3030/createServiceRequest",
        dataToSubmit
      );
        navigate(window.location.reload())
    } catch (error) {
      console.error("Error adding service request:", error);
    }
  };

  return (
    <>
      <h2>Service Request Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="serviceCategoryId">Select Service Category</label>
        <select
          id="serviceCategoryId"
          name="ServiceCategoryId"
          value={formData.ServiceCategoryId}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a service category
          </option>
          {serviceCategories.map((category) => (
            <option
              key={category.ServiceCategoryId}
              value={category.ServiceCategoryId}
            >
              {category.ServiceCategoryName}
            </option>
          ))}
        </select>

        <label htmlFor="ProductDimension">Product Dimensions</label>
        <input
          type="number"
          id="ProductDimension"
          name="ProductDimension"
          value={formData.ProductDimension}
          onChange={handleChange}
          required
        />

        <p>Total Cost: ${calculateTotalCost()}</p>

        <label htmlFor="workDetail">Work Detail</label>
        <textarea
          id="workDetail"
          name="WorkDetail"
          value={formData.WorkDetail}
          onChange={handleChange}
          required
        />

        <label htmlFor="requestDate">Date of Request</label>
        <input
          type="date"
          id="requestDate"
          name="RequestDate"
          value={formData.RequestDate}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
