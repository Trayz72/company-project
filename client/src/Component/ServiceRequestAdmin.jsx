import React, { useState, useEffect } from "react";
import axios from "axios";


export const ServiceRequestAdmin = () => {
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3030/serviceRequests")
      .then((res) => {
 // Log the entire response object
        setServiceRequests(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      await axios.put(`http://localhost:3030/updateStatus/${requestId}`, {
        Status: newStatus,
      });

      setServiceRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.RequestId === requestId
            ? { ...request, Status: newStatus }
            : request
        )
      );
    } catch (error) {
      console.error("Error updating service request status:", error);
    }
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      await axios.delete(`http://localhost:3030/deleteRequest/${requestId}`);

      setServiceRequests((prevRequests) =>
        prevRequests.filter((request) => request.RequestId !== requestId)
      );
    } catch (error) {
      console.error("Error deleting service request:", error);
    }
  };

  return (
    <>
      <div className="table-container">
        {serviceRequests.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Service Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Contact_Number</th>
                <th>Work Detail</th>
                <th>Date of Request</th>
                <th>Status</th>
                <th>TotalCost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {serviceRequests.map((request, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>{request.RequestId}</td>
                  <td>{request.ServiceCategoryName}</td>
                  <td>{request.Username}</td>
                  <td>{request.Email}</td>
                  <td>{request.Contact_Number}</td>
                  <td>{request.WorkDetail}</td>
                  <td>{request.RequestDate}</td>
                  <td>{request.Status}</td>
                  <td>{request.TotalCost}</td>
                  <td className="action-buttons">
                    <button
                      className="link my-2 mx-2"
                      onClick={() =>
                        handleUpdateStatus(request.RequestId, "Approved")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="link my-2 mx-2"
                      onClick={() =>
                        handleUpdateStatus(request.RequestId, "Rejected")
                      }
                    >
                      Reject
                    </button>
                    <button
                      className="link my-2 mx-2"
                      onClick={() => handleDeleteRequest(request.RequestId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>No records available</h2>
        )}
      </div>
    </>
  );
};
