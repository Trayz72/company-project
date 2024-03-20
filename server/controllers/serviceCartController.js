const db = require('../db');

exports.createServiceCart = (req, res) => {
  const sql = `INSERT INTO servicecart (ServiceId, Dimension, totalPrice) VALUES (?, ?, ?)`;

  const values = [
    req.body.ServiceId,
    req.body.Dimension,
    req.body.totalPrice
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log("Database error:", err); // Log the error for debugging
      return res.status(500).json({ Error: "Error inserting into servicecart table" });
    } else {
      return res.json(data);
    }
  });
}

exports.getAllServiceCart = (req, res) => {
  const sql = `SELECT 
                  s.Image,
                  s.ServiceName,
                  s.CostPerHour,
                  c.Dimension,
                  c.totalPrice,
                  c.ServiceId
                FROM 
                  servicecart c
                LEFT JOIN service s ON c.ServiceId = s.ServiceId
  `;

  db.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ Error: "Error" });
    } else {
      if (data && data.length > 0) {
        // Set Cache-Control headers to prevent caching
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.json(data); 
      } else {
        res.status(404).json({ Error: "No cartItem found" });
      }
    }
  });
}

exports.getSumOfTotalPrice= (req, res) =>{
  const sql = `SELECT SUM(totalPrice) AS totalPrice FROM servicecart;`;

  db.query(sql, (err, data) => {
    if (err) {
      res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

exports.deleteServiceCart = (req, res) => {
  const sql = ` DELETE FROM servicecart where ServiceId = ?`;
  const id = req.params.id;
  // console.log(id);
  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}