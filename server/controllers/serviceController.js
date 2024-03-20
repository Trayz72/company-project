// serviceController.js
const db = require("../db");

// List all services
const getServices = (req, res) => {
  db.query("SELECT * FROM ServiceCategory", (err, results) => {
    if (err) {
      console.error("Error fetching services:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};

// Add a new service category
const addService = (req, res) => {
  const {
    ServiceCategoryName,
    ServiceCategoryDescription,
    CostPerHour,
    ProductDimension,
  } = req.body;

  const query = `
    INSERT INTO ServiceCategory 
    (ServiceCategoryName, ServiceCategoryDescription, CostPerHour, ProductDimension)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      ServiceCategoryName,
      ServiceCategoryDescription,
      CostPerHour,
      ProductDimension,
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding service:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({
          message: "Service added successfully",
          ServiceCategoryId: result.insertId,
        });
      }
    }
  );
};

// Update a service category
const updateService = (req, res) => {
  const ServiceCategoryId = req.params.id;
  const {
    ServiceCategoryName,
    ServiceCategoryDescription,
    CostPerHour,
    ProductDimension,
  } = req.body;

  const query = `
    UPDATE ServiceCategory
    SET ServiceCategoryName=?, ServiceCategoryDescription=?, CostPerHour=?, ProductDimension=?
    WHERE ServiceCategoryId=?
  `;

  db.query(
    query,
    [
      ServiceCategoryName,
      ServiceCategoryDescription,
      CostPerHour,
      ProductDimension,
      ServiceCategoryId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating service:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ message: "Service updated successfully" });
      }
    }
  );
};

// Delete a service category
const deleteService = (req, res) => {
  const ServiceCategoryId = req.params.id;

  const query = "DELETE FROM ServiceCategory WHERE ServiceCategoryId=?";

  db.query(query, [ServiceCategoryId], (err, result) => {
    if (err) {
      console.error("Error deleting service:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Service deleted successfully" });
    }
  });
};

module.exports = {
  getServices,
  addService,
  updateService,
  deleteService,
};
