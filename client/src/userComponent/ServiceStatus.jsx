import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Rent.css";
import { logContext } from "./Context.jsx";

export default function ServiceStatus() {
  const { userId } = useContext(logContext);
  const [rentRequests, setRentRequests] = useState([]);

  useEffect(() => {
    if (userId) {
      axios
        .get("http://localhost:3030/getAllServiceRequestsFromUser", {
          params: {
            userId: userId,
          },
        })
        .then((response) => {
          setRentRequests(response.data);
        })
        .catch((error) => {
          console.error("Error fetching rent requests:", error);
        });
    }
  }, [userId]);

  if (!userId) {
    return <div>Please log in to view rent status.</div>;
  }

  return (
    <>
      <div className="rent-status-page">
        <h2>Your Service Requests</h2>
        {rentRequests.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Service Name</th>
                <th>Work Detail</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {rentRequests.map((request) => (
                <tr key={request.RequestId}>
                  <td>{request.RequestId}</td>
                  <td>{request.ServiceCategoryName}</td>
                  <td>{request.WorkDetail}</td>
                  <td>{request.RequestDate}</td>
                  <td>{request.Status}</td>
                  <td>{request.TotalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No rent requests found.</p>
        )}
      </div>
    </>
  );
}
