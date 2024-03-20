import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Service = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3030/services")
      .then((res) => setServices(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (ServiceCategoryId) => {
    axios
      .delete(`http://localhost:3030/services/${ServiceCategoryId}`)
      .then(() => {
        // Remove the deleted service from the state
        setServices((prevServices) =>
          prevServices.filter(
            (service) => service.ServiceCategoryId !== ServiceCategoryId
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const addServiceRedirect = () => {
    navigate("/dashboard/AddService");
  };

  if (services.length === 0) {
    return (
      <>

        <div className="table-container">
          <button className="add-btn" onClick={addServiceRedirect}>
            Add Service
          </button>
          <h2>No records available</h2>
        </div>
      </>
    );
  }

  return (
    <>

      <div className="table-container">
        <button className="link" onClick={addServiceRedirect}>
          Add Service
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Service Category Name</th>
              <th>Description</th>
              <th>CostPerHour</th>
              <th>Product Dimension</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.ServiceCategoryId}>
                <td>{service.ServiceCategoryName}</td>
                <td>{service.ServiceCategoryDescription}</td>
                <td>{service.CostPerHour}</td>
                <td>{service.ProductDimension}</td>
                <td className="action-buttons">
                  <Link
                    className="link"
                    to={`/dashboard/UpdateService/${service.ServiceCategoryId}`}
                  >
                    Update
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(service.ServiceCategoryId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Service;
