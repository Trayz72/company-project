const db = require('../db');

exports.createCheckoutPayment = (req, res) => {

  // Insert form data into MySQL
  const sql = 'INSERT INTO checkoutPayment (fullName, email, contactNumber, address, zipCode, city, country, paymentMethod) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    req.body.fullName,
    req.body.email,
    req.body.contactNumber,
    req.body.address,
    req.body.zipCode,
    req.body.city,
    req.body.country,
    req.body.paymentMethod
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log("Database error:", err); // Log the error for debugging
      return res.status(500).json({ Error: "Error inserting into servicecart table" });
    } else {
      return res.json(data);
    }
  });
};