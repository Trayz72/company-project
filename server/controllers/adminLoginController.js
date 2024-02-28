const db = require("../db");
const jwt = require("jsonwebtoken");

exports.adminLogin = (req, res) => {
  const sql = "SELECT * FROM admin_table WHERE User_Name = ? AND Password = ?";
  const values = [req.body.User_Name, req.body.Password];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({loginStatus: true})
    } else {
      return res.json({ loginStatus: false, Error: "Wrong username or password" })
    }
  });
};
