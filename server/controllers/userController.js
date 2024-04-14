const db = require("../db");
const jwt = require("jsonwebtoken");

exports.userRegister = (req, res) => {
  const sql = `insert into user_account (Username, Address, Contact_Number, Email, Password, Pincode) values(?,?,?,?,?,?)`;

  const values = [
    req.body.Username,
    req.body.Address,
    req.body.Contact_Number,
    req.body.Email,
    req.body.Password,
    req.body.Pincode,
  ]

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      return res.json({Status: true});
    }
  });
}

exports.userLogin = (req, res) => {
  const sql = "SELECT * FROM User_Account WHERE Username = ? AND Password = ?";

  const values = [req.body.Username, req.body.Password];

  db.query(sql, values, (userErr, userResult) => {
    if (userErr) {
      console.error("Error logging in as user:", userErr);
      res.status(500).json({ error: "Internal Server Error" });
    } else if (userResult.length > 0) {
      // user login successful
      const { UserId } = userResult[0];
      res.json({
        message: "user login successful",
        userType: "user",
        UserId: UserId,
      });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong username or password" })
    }
  });
}

exports.getAllCustomer = (req, res) => {
  const sql = "SELECT * FROM User_Account";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err); 
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(data);
  });
};