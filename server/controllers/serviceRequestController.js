const db = require("../db");

// exports.getAllServiceRequests = async (req, res) => {
//   try {
//     const serviceRequests = await db.query("SELECT * FROM ServiceRequest");

//     // Log the serviceRequests to inspect its structure
//     console.log(serviceRequests);

//     // Assuming serviceRequests is an object with a property like 'results'
//     const results = serviceRequests.results || [];

//     // Extracting necessary properties to avoid circular references
//     const sanitizedServiceRequests = results.map((request) => ({
//       RequestId: request.RequestId,
//       ServiceCategoryId: request.ServiceCategoryId,
//       UserId: request.UserId,
//       RequestDate: request.RequestDate,
//       WorkDetail: request.WorkDetail,
//       Status: request.Status,
//       // Add other necessary properties
//     }));

//     res.status(200).json(sanitizedServiceRequests);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
exports.getAllServiceRequests = (req, res) => {
  db.query(
    "SELECT ServiceRequest.RequestId, ServiceCategory.ServiceCategoryName, User_Account.Username, User_Account.Email, User_Account.Contact_Number, ServiceRequest.WorkDetail, ServiceRequest.RequestDate, ServiceRequest.Status, ServiceRequest.TotalCost FROM ServiceRequest JOIN User_Account ON ServiceRequest.UserId = User_Account.UserId JOIN ServiceCategory ON ServiceRequest.ServiceCategoryId = ServiceCategory.ServiceCategoryId ",
    (err, results) => {
      if (err) {
        console.error("Error fetching services:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json(results);
      }
    }
  );
};

exports.createServiceRequest = async (req, res) => {
  const { ServiceCategoryId, UserId, RequestDate, WorkDetail, TotalCost } =
    req.body;

  try {
    // Use parseFloat to convert TotalCost to a decimal number
    await db.query(
      "INSERT INTO ServiceRequest (ServiceCategoryId, UserId, RequestDate, WorkDetail, TotalCost) VALUES (?, ?, ?, ?, ?)",
      [
        ServiceCategoryId,
        UserId,
        RequestDate,
        WorkDetail,
        parseFloat(TotalCost),
      ]
    );

    res.status(201).json({ message: "Service request created successfully" });
  } catch (error) {
    console.error("Error adding service request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateStatus = (req, res) => {
  const requestId = req.params.id;
  const { Status } = req.body;

  const query = `
      UPDATE ServiceRequest
      SET Status=?
      WHERE RequestId=?
    `;

  db.query(query, [Status, requestId], (err, result) => {
    if (err) {
      console.error("Error updating RentRequest:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "RentRequest updated successfully" });
    }
  });
};

exports.deleteRequest = (req, res) => {
  const requestId = req.params.id;
  db.query(
    "DELETE FROM ServiceRequest WHERE RequestId = ?",
    [requestId],
    (err, data) => {
      if (err) {
        res.json({ Error: "Error" });
      } else {
        res.json(data);
      }
    }
  );
};

exports.getAllServiceRequestsFormUser = (req, res) => {
  const { userId } = req.query;
  const query = `SELECT ServiceRequest.RequestId, ServiceCategory.ServiceCategoryName, ServiceRequest.WorkDetail, ServiceRequest.RequestDate, ServiceRequest.Status, ServiceRequest.TotalCost FROM ServiceRequest JOIN ServiceCategory ON ServiceRequest.ServiceCategoryId = ServiceCategory.ServiceCategoryId WHERE UserId = ?;`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching RentRequests:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};
